/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const config = require('config');
const crypto = require('crypto');
const Category = require('../../categories/models/category');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  title: String,
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
  username: {
    type: String,
    unique: true,
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
  image: {
    type: String,
    default: 'http://via.placeholder.com/320x320',
  },
  rating: {
    type: Number,
    default: 3,
  },
  price: {
    type: Number,
    default: 1000,
  },
  category: {
    ref: Category,
    type: mongoose.Schema.Types.ObjectId,
  },
});

userSchema.virtual('password')
  .set(function (password) {
    if (!password) {
      this.invalidate('password', 'Password can\'t be empty!');
    }

    if (password !== undefined) {
      if (password.length < 6) {
        this.invalidate('password', 'Password can\'t be less than 6 symbols!');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.get('crypto').hash.length).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.get('crypto').hash.iterations,
        config.get('crypto').hash.length,
        'sha1',
      ).toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    config.get('crypto').hash.iterations,
    config.get('crypto').hash.length,
    'sha1',
  ).toString('base64') === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
