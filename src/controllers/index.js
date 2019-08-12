const User = require('../accounts/models/user');

exports.mainpage = async (ctx) => {
  console.log(ctx.params.id);
  const user = await User.findOne({ _id: ctx.params.id });
  await ctx.render('index', {
    firstName: user.firstName,
    lastName: user.lastName,
    title: user.title,
    id: ctx.params.id,
  });
};
