/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const Category = require('../../categories/models/category');

const signUpRequestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: '{VALUE} is already exist!',
    required: true,
    validate: {
      validator: function checkEmail(value) {
        const re = /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/;
        return re.test(value);
      },
      message: props => `${props.value} is not a valid email.`,
    },
  },
  phoneNumber: {
    type: String,
  },
  location: {
    type: { type: String },
    coordinates: [],
  },
  category: {
    ref: Category,
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('SignUpRequest', signUpRequestSchema);
