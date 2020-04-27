const mongoose = require('mongoose');
const User = require('./user');

const emailValidationRequestSchema = new mongoose.Schema({
  user: {
    ref: User,
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('EmailValidation', emailValidationRequestSchema);
