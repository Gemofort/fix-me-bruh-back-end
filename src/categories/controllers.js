const Category = require('./models/category');

exports.categories = async (ctx) => {
  const categories = await Category.find({});
  ctx.body = {
    categories,
  };
};
