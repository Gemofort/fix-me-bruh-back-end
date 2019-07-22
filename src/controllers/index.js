const User = require('../models/user');

exports.loadMainpage = async (ctx) => {
  const user = await User.findOne({ firstName: 'Faruh' });
  await ctx.render('index', {
    firstName: user.firstName,
    lastName: user.lastName,
    title: user.title,
  });
};
