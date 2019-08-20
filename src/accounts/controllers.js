const passport = require('koa-passport');
const config = require('config');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const User = require('./models/user');
const sendEmail = require('../utils/sendEmail');
const uploadS3 = require('../utils/uploadS3');

exports.users = async (ctx) => {
  const users = await User.find({}).populate('category');
  ctx.body = {
    users,
  };
};

exports.user = async (ctx) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne(ctx.state.user._id);
  ctx.body = {
    user,
  };
};

exports.updateUser = async (ctx) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne({ _id: ctx.state.user._id });
  const keyValue = Object.keys(ctx.request.body)[0];
  user[keyValue] = ctx.request.body[keyValue];
  await user.save();
  ctx.body = {
    user,
  };
};

exports.userById = async (ctx) => {
  const user = await User.findOne({ _id: ctx.params.id });
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

exports.profile = async (ctx) => {
  ctx.body = 'SUPER SECRET ONLY 4 USERS';
};


exports.signUp = async (ctx) => {
  try {
    const user = new User({
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      title: 'Mr',
      email: ctx.request.body.email,
      username: ctx.request.body.email,
      password: ctx.request.body.password,
      price: 1200,
      category: mongoose.Types.ObjectId('5d401071de4b8204a812a424'),
    });

    await user.save();

    ctx.body = {
      success: true,
    };
  } catch (err) {
    ctx.body = {
      error: err,
    };
  }
};

exports.testEmail = async (ctx) => {
  try {
    await sendEmail(
      ctx.request.body.email,
      'notifications@example.com',
      'Hello email!',
      'Text example',
      '<p>Test data!</p>',
    );
    ctx.body = {
      success: true,
    };
  } catch (err) {
    ctx.body = {
      error: err,
    };
  }
};

exports.updateUserPhoto = async (ctx) => {
  console.log(ctx.request.files.image);
  const image = await uploadS3(config.get('aws').userPhotoFolder, ctx.request.files.image);
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne(ctx.state.user._id);

  user.image = image;
  await user.save();

  ctx.body = {
    image,
  };
};
