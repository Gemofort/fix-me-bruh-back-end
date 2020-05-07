/* eslint-disable no-underscore-dangle */
const passport = require('koa-passport');
const config = require('config');
const jwt = require('jwt-simple');
// const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const twilioClient = require('twilio')(config.get('twilio.accountSid'), config.get('twilio.authToken'));
const User = require('./models/user');
const Category = require('../categories/models/category');
const { sendEmail } = require('../utils/sendEmail');
const uploadS3 = require('../utils/uploadS3');
const EmailValidation = require('./models/emailValidationRequest');

exports.search = async (ctx) => {
  // let users = [];
  const searchObj = {
    _id: { $ne: ctx.state.user._id }, emailVerified: true, phoneVerified: true, $or: [],
  };

  const {
    name, category, lat, lng,
  } = ctx.query;

  if (name) {
    searchObj.$or.push(
      { firstName: { $regex: new RegExp(name, 'i') } },
      { lastName: { $regex: new RegExp(name, 'i') } },
    );
  }

  if (lat && lng) {
    searchObj.location = {};
    searchObj.location.$near = {
      $geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      $maxDistance: 100000,
    };
  }

  if (category) {
    const categories = await Category.find({ name: { $regex: new RegExp(category, 'i') } }).select('_id');
    const categoryIds = categories.map(categ => categ._id);

    searchObj.$or.push({ category: { $in: categoryIds } });
  }

  if (!searchObj.$or.length) {
    delete searchObj.$or;
  }

  let users = await User.find(searchObj)
    .populate({ path: 'category', select: '-__v' })
    .select('-__v -passwordHash -salt');

  users = users.map(user => user.toObject());

  ctx.body = { users };
};

exports.user = async (ctx) => {
  const plainUser = await (await User.findOne({ _id: ctx.state.user.id }).populate('category').select('-passwordHash -salt -__v')).toObject();

  const emailValidationRequest = await EmailValidation.findOne({ user: ObjectId(plainUser._id) }).select('-__v');

  const resp = { user: { ...plainUser } };

  if (emailValidationRequest) {
    resp.user.emailValidationRequest = emailValidationRequest;
  }

  ctx.body = resp;
};

exports.updateUser = async (ctx) => {
  const { body } = ctx.request;
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne({ _id: ctx.state.user._id }).select('-passwordHash -salt').select('-__v');

  if (body.email && body.email !== user.email) {
    user.emailVerified = false;

    const emailValidationRequest = await EmailValidation.findOne({ user: ObjectId(user._id) });
    const emailValidation = new EmailValidation({ user });

    await Promise.all([emailValidationRequest.remove(), emailValidation.save()]);

    await sendEmail(config.get('sendGrid.emailValidation'),
      user.email, { link: `localhost:3000/accounts/user/email/${emailValidation._id}` });

    user.email = body.email;
  }

  if (body.phoneNumber && body.email !== user.phoneNumber) {
    user.phoneVerified = false;
    user.phone = body.phone;
  }

  user.firstName = body.firstName;
  user.lastName = body.lastName;
  user.location.coordinates = [body.longitude, body.latitude];

  await user.save();

  ctx.body = { user: user.toObject() };
};

exports.resendEmailVerification = async (ctx) => {
  // eslint-disable-next-line max-len
  const emailValidationRequest = await EmailValidation.findOne({ user: ObjectId(ctx.state.user._id) });

  if (emailValidationRequest) {
    await sendEmail(config.get('sendGrid.emailValidation'),
      ctx.state.user.email, { link: `localhost:3000/accounts/user/email/${emailValidationRequest._id}` });

    ctx.body = { success: true };
  } else {
    ctx.throw(400, 'No email validation request found');
  }
};

exports.userById = async (ctx) => {
  const user = await User.findOne({ _id: ObjectId(ctx.params.id) }).populate('category').select('-passwordHash -salt -__v');
  ctx.body = { user: user.toObject() };
};

exports.signIn = async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      const payload = {
        id: user.id,
      };
      ctx.body = {
        token: jwt.encode(payload, config.get('jwtSecret')),
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } else {
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};


exports.signUp = async (ctx) => {
  const { body } = ctx.request;

  const category = await Category.findOne({ name: { $regex: new RegExp(body.category, 'i') } });
  let categoryId;

  if (!category) {
    const newCategory = await new Category({ name: body.category }).save();
    categoryId = newCategory._id;
  }

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    phoneNumber: body.phoneNumber,
    location: {
      type: 'Point',
      coordinates: [body.longitude, body.latitude],
    },
    category: category ? category._id : categoryId,
  });

  const emailValidation = new EmailValidation({ user });

  await Promise.all([user.save(), emailValidation.save()]);

  await sendEmail(config.get('sendGrid.emailValidation'),
    user.email, { link: `localhost:3000/accounts/user/email/${emailValidation._id}` });

  ctx.body = {
    success: true,
  };
};

exports.validateEmail = async (ctx) => {
  const { id } = ctx.params;

  const plainRequest = await EmailValidation.findOne({ _id: ObjectId(id) }).populate('user');
  const user = await User.findOne({ _id: ctx.state.user._id });

  if (!plainRequest || plainRequest.user._id.toString() !== ctx.state.user._id.toString()) {
    ctx.throw(400, 'Ivalid email validation request code');
  }

  user.emailVerified = true;

  await Promise.all([user.save(), plainRequest.remove()]);

  ctx.body = { success: true };
};

exports.updateUserPhoto = async (ctx) => {
  const image = await uploadS3(config.get('aws').userPhotoFolder, ctx.request.files.image);
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne({ _id: ctx.state.user._id }).select('-passwordHash -salt');

  user.image = image;
  await user.save();

  ctx.body = {
    image,
  };
};

exports.sendVerificationCode = async (ctx) => {
  const { phoneNumber } = ctx.state.user;

  await twilioClient.verify.services(config.get('twilio.serviceSid'))
    .verifications
    .create({ to: phoneNumber, channel: 'sms' })
    .catch((err) => {
      ctx.throw('400', err);
    });

  ctx.body = { success: true };
};

exports.verifyCode = async (ctx) => {
  const { code } = ctx.request.body;
  const { phoneNumber } = ctx.state.user;

  const verificationCheck = await twilioClient.verify.services(config.get('twilio.serviceSid'))
    .verificationChecks
    .create({ to: phoneNumber, code });

  if (!verificationCheck.valid) {
    ctx.throw(400, 'This code is not valid, try another one.');
  }

  const user = await User.findOne({ _id: ctx.state.user._id });

  user.phoneVerified = true;
  await user.save();

  ctx.body = { success: true };
};
