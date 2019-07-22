const User = require('../models/user');

exports.loadSignUp = async (ctx) => {
  await ctx.render('sign_up');
};

exports.loadComplete = async (ctx) => {
  await ctx.render('sign_up_comp');
};

exports.postSignUp = async (ctx) => {
  const {
    firstName,
    lastName,
    title,
    email,
    username,
    password,
  } = ctx.request.body;
  const user = new User({
    firstName,
    lastName,
    title,
    email,
    username,
    password,
  });
  await user.save();

  console.log(user);

  ctx.body = {
    success: true,
  };
};
