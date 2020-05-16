const mongoose = require('mongoose');
const User = require('./user');

const resetPasswordRequestSchema = new mongoose.Schema({
  user: {
    ref: User,
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('ResetPassword', resetPasswordRequestSchema);
