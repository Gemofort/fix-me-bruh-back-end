const id = require('pow-mongodb-fixtures').createObjectId;
const mongoose = require('mongoose');
const config = require('config');
const User = require('../models/user');
const Category = require('../models/category');

mongoose.connect(config.get('databaseUrl'), {
  useNewUrlParser: true,
  useCreateIndex: true,
})
  .catch((err) => {
    console.log(err);
  });

const users = [
  {
    _id: id(),
    firstName: 'Faruh',
    lastName: 'Bernandez',
    title: 'Mr',
    email: 'sarahbbb@gmail.com',
    username: 'sarahbarnes',
    password: '123asd',
    image: 'http://placehold.it/320x320',
    rating: 6.73,
    price: 602,
    category: 'Python',
  },
];

users.forEach(async (user) => {
  const userDb = new User(user);
  await userDb.save();
});

// const categories = [
//   {
//     name: 'Node.js',
//   },
//   {
//     name: 'Python',
//   },
//   {
//     name: 'Java',
//   },
// ];

// categories.forEach(async (category) => {
//   const catDb = new Category(category);
//   await catDb.save();
// });

// module.exports = {
//   users,
//   categories,
// };
