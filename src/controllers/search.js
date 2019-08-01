const User = require('../models/user');

exports.searchPeople = async (ctx) => {
  const users = await User.find({});
  await ctx.render('search', { users });
};

exports.sortPeople = async (ctx) => {
  const key = ctx.request.body.radio;
  let users = [];
  if (key === 'price') {
    users = await User.find({}).sort({ price: 1 });
  } else {
    users = await User.find({}).sort({ rating: 1 });
  }
  await ctx.render('search', { users });
};

exports.map = async (ctx) => {
  await ctx.render('search_map');
};