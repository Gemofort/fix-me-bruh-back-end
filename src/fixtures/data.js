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
    firstName: 'Milagros',
    lastName: 'Cleveland',
    title: 'Mrs',
    email: 'milagros.cleveland@gmail.com',
    username: 'Milagros_Cleveland',
    password: '123asd',
    image: 'http://placehold.it/320x320',
    rating: 4.80,
    price: 1468,
    category: 'Java',
  },
  {
    _id: id(),
    firstName: 'Ginger',
    lastName: 'Powers',
    title: 'Mr',
    email: 'ginger.powers@gmail.com',
    username: 'Ginger_Powers',
    password: '123asd',
    image: 'http://placehold.it/320x320',
    rating: 9.44,
    price: 1534,
    category: 'Node.js',
  },
  {
    _id: id(),
    firstName: 'Jennie',
    lastName: 'Vance',
    title: 'Mrs',
    email: 'jennie.vance@gmail.com',
    username: 'Jennie_Vance',
    password: '123asd',
    image: 'http://placehold.it/320x320',
    rating: 6.68,
    price: 1215,
    category: 'Python',
  },
  {
    _id: id(),
    firstName: 'Shelby',
    lastName: 'Conrad',
    title: 'Mr',
    email: 'shelby.conrad@gmail.com',
    username: 'Shelby_Conrad',
    password: '123asd',
    image: 'http://placehold.it/320x320',
    rating: 7.30,
    price: 1594,
    category: 'Node.js',
  },
  {
    _id: id(),
    firstName: 'Stafford',
    lastName: 'Harrington',
    title: 'Mr',
    email: 'stafford.harrington@gmail.com',
    username: 'Stafford_Harrington',
    password: '123asd',
    image: 'http://placehold.it/320x320',
    rating: 9.51,
    price: 1823,
    category: 'Node.js',
  },
  {
    _id: id(),
    firstName: 'Maddox',
    lastName: 'Cooke',
    title: 'Mrs',
    email: 'maddox.cooke@gmail.com',
    username: 'Maddox_Cooke',
    password: '123asd',
    image: 'http://placehold.it/320x320',
    rating: 4.48,
    price: 1738,
    category: 'Python',
  },
  {
    _id: id(),
    firstName: 'Bradshaw',
    lastName: 'Brady',
    title: 'Mrs',
    email: 'bradshaw.brady@gmail.com',
    username: 'Bradshaw_Brady',
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

const categories = [
  {
    name: 'Node.js',
  },
  {
    name: 'Python',
  },
  {
    name: 'Java',
  },
];

categories.forEach(async (category) => {
  const catDb = new Category(category);
  await catDb.save();
});

// module.exports = {
//   users,
//   categories,
// };
