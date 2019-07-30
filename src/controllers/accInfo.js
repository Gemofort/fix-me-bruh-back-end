const User = require('../models/user');

exports.accInfo = async (ctx) => {
  console.log(ctx.params.id);
  const user = await User.findOne({ _id: ctx.params.id });
  await ctx.render('mainpage2', {
    username: user.username,
    email: user.email,
    id: user.id,
  });
};
