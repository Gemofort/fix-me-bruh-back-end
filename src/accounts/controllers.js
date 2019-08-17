const passport = require('koa-passport');
const config = require('config');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const User = require('./models/user');
const sendEmail = require('../utils/sendEmail');

exports.users = async (ctx) => {
  const users = await User.find({}).populate('category');
  ctx.body = {
    users,
  };
};

exports.user = async (ctx) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOne(ctx.state.user._id);
  console.log(user);
  ctx.body = {
    user,
  };
};

exports.userById = async (ctx) => {
  console.log(ctx.params);
  const user = await User.findOne({ _id: ctx.params.id });
  console.log(user);
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


exports.postSignUp = async (ctx) => {
  const user = new User({
    firstName: 'Garen',
    lastName: 'Demacia',
    title: 'Mr',
    email: 'garen@demacia.com',
    username: 'qwerty2',
    password: 'qwerty',
    price: 1200,
    category: mongoose.Types.ObjectId('5d401071de4b8204a812a425'),
  });

  await user.save();


  ctx.body = {
    success: true,
  };
};

exports.testEmail = async (ctx) => {
  await sendEmail(
    'vanya6677@gmail.com',
    'notifications@example.com',
    'Hello email!',
    'Text example',
    '<p>Test data!</p>',
  );
  ctx.body = {
    success: true,
  };
};
