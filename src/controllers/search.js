const User = require('../models/user');

exports.searchPeople = async (ctx) => {
  const users = await User.find({});
  await ctx.render('search', { users });
};
