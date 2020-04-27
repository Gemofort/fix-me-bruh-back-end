const Router = require('koa-joi-router');
const { validateFileTypeAndSize } = require('../helpers/fileValidate');

const joi = Router.Joi;

const userSchema = {
  _id: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().required(),
  location: joi.object().required(),
  image: joi.string().required(),
  category: joi.any(),
};

exports.signUp = {
  validate: {
    type: 'json',
    body: {
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      phoneNumber: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      longitude: joi.number().required(),
      latitude: joi.number().required(),
    },
    output: {
      200: {
        body: {
          success: joi.bool().valid(true),
        },
      },
    },
  },
};

exports.updateUser = {
  validate: {
    type: 'json',
    body: {
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      longitude: joi.number().required(),
      latitude: joi.number().required(),
    },
    output: {
      200: {
        body: userSchema,
      },
    },
  },
};

exports.sendVerificationCode = {
  validate: {
    type: 'json',
    body: {
      number: joi.string().required(),
    },
    output: {
      200: {
        body: {
          success: joi.bool().valid(true),
        },
      },
    },
  },
};

exports.verifyCode = {
  validate: {
    type: 'json',
    body: {
      number: joi.string().required(),
      code: joi.string().required(),
    },
    output: {
      200: {
        body: {
          success: joi.bool().valid(true),
        },
      },
    },
  },
};

exports.user = {
  validate: {
    output: {
      200: {
        body: userSchema,
      },
    },
  },
};

exports.signIn = {
  validate: {
    output: {
      200: {
        body: {
          token: joi.string().required(),
          user: {
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required(),
          },
        },
      },
    },
  },
};

exports.updateUserPhoto = {
  pre: async (ctx, next) => {
    await validateFileTypeAndSize(ctx, 'image');
    await next();
  },
  validate: {
    output: {
      200: {
        body: {
          image: joi.string().required(),
        },
      },
    },
  },
};

exports.validateEmail = {
  validate: {
    params: {
      id: joi.string().required(),
    },
    output: {
      200: {
        body: {
          success: joi.bool().valid(true),
        },
      },
    },
  },
};
