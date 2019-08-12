const passport = require('koa-passport');
const config = require('config');
const jwt = require('jwt-simple');
const User = require('./models/user');

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

// exports.signUp = async (ctx) => {
//   await ctx.render('sign_up');
// };

// exports.complete = async (ctx) => {
//   await ctx.render('sign_up_comp');
// };


exports.postSignUp = async (ctx) => {
  const user = new User({
    firstName: 'Vasya',
    lastName: 'Pupkin',
    title: 'Mr',
    email: 'vasya@pupkin.com',
    username: 'shiettalker',
    password: 'kek1337',
  });

  await user.save();


  ctx.body = {
    success: true,
  };
};
