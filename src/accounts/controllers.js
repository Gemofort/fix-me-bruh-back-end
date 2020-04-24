const passport = require('koa-passport');
const config = require('config');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const User = require('./models/user');
const sendEmail = require('../utils/sendEmail');
const uploadS3 = require('../utils/uploadS3');

exports.users = async (ctx) => {
  let users = [];
  // console.log(ctx.href);

  if (ctx.query.search) {
    const givenObj = JSON.parse(ctx.query.search);
    // eslint-disable-next-line no-underscore-dangle
    const sortingObj = { _id: { $ne: ctx.state.user._id } };

    // categories: ObjectId('wqefsjafdvaytsfdhgasd')
    if (givenObj.category && givenObj.category !== 'All') {
      sortingObj.category = ObjectId(givenObj.category);
    }

    // $or on firstName and lastName with RegExp
    if (givenObj.field) {
      sortingObj.$or = [
        { firstName: { $regex: new RegExp(givenObj.field, 'i') } },
        { lastName: { $regex: new RegExp(givenObj.field, 'i') } },
      ];
    }

    users = await User.find(sortingObj)
      .populate('category')
      .select('-passwordHash -salt')
      .sort(givenObj.sort);
  } else {
    // eslint-disable-next-line no-underscore-dangle
    users = await User.find({ _id: { $ne: ctx.state.user._id } })
      .populate('category')
      .select('-passwordHash -salt')
      .sort('');
  }
  ctx.body = {
    users,
  };
};

exports.user = async (ctx) => {
  ctx.body = {
    user: ctx.state.user,
  };
};

exports.updateUser = async (ctx) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne({ _id: ctx.state.user._id }).select('-passwordHash -salt');
  const keyValue = Object.keys(ctx.request.body)[0];

  if (Object.prototype.hasOwnProperty.call(user.toObject(), keyValue)) {
    if (keyValue === 'category') {
      // eslint-disable-next-line no-underscore-dangle
      user[keyValue] = ObjectId(ctx.request.body[keyValue]);
    } else {
      user[keyValue] = ctx.request.body[keyValue];
    }

    await user.save();
    ctx.body = {
      user,
    };
  } else {
    ctx.body = {
      error: true,
    };
  }
};

exports.userById = async (ctx) => {
  const user = await User.findOne({ _id: ctx.params.id }).populate('category').select('-passwordHash -salt');
  ctx.body = {
    user,
  };
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
  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    phoneNumber: body.phoneNumber,
    category: mongoose.Types.ObjectId('5d401071de4b8204a812a424'),
  });

  await user.save();

  ctx.body = {
    success: true,
  };
};

exports.testEmail = async (ctx) => {
  await sendEmail(
    ctx.request.body.email,
    'notifications@example1.com',
    'Hello email!',
    'Text example',
    '<p>Test data!</p>',
  );

  ctx.body = {
    success: true,
  };
};

exports.updateUserPhoto = async (ctx) => {
  const image = await uploadS3(config.get('aws').userPhotoFolder, ctx.request.files.image);
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne(ctx.state.user._id).select('-passwordHash -salt');

  user.image = image;
  await user.save();

  ctx.body = {
    user,
  };
};
