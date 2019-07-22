const User = require('../models/user');

exports.loadAccInfo = async (ctx) => {
  const user = await User.findOne({ firstName: 'Faruh' });
  await ctx.render('mainpage2', {
    username: user.username,
    email: user.email,
  });
};
