const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  title: String,
  email: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
