const Category = require('./models/category');

exports.categories = async (ctx) => {
  let categories = await Category.find({}).select('-__v');
  categories = categories.map(category => category.toObject());
  ctx.body = {
    categories,
  };
};
