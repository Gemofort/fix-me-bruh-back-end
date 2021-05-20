const Router = require('koa-joi-router');
const { validateFileTypeAndSize } = require('../helpers/fileValidate');

const joi = Router.Joi;

const userSchema = {
  _id: joi.any().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().required(),
  location: joi.object().required(),
  locationName: joi.string().required(),
  image: joi.string().required(),
  category: joi.any().required(),
  emailVerified: joi.bool().required(),
  phoneVerified: joi.bool().required(),
  emailValidationRequest: joi.any(),
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
      category: joi.string().required(),
    },
    output: {
      201: {
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
        body: { user: userSchema },
      },
    },
  },
};

exports.userUpdate = {
  validate: {
    type: 'json',
    body: {
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      longitude: joi.number().required(),
      latitude: joi.number().required(),
      email: joi.string().email(),
      phoneNumber: joi.string(),
    },
    output: {
      200: {
        body: { user: userSchema },
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

exports.resendEmailVerification = {
  validate: {
    output: {
      200: {
        body: {
          success: joi.bool().valid(true),
        },
      },
    },
  },
};

exports.resetPasswordRequest = {
  validate: {
    type: 'json',
    body: {
      email: joi.string().email(),
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

exports.resetPassword = {
  validate: {
    type: 'json',
    params: {
      id: joi.string().required(),
    },
    body: {
      email: joi.string().email(),
      password: joi.string().min(6),
      confirmPassword: joi.string().valid(joi.ref('password')).required(),
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

exports.search = {
  validate: {
    query: {
      name: joi.string(),
      category: joi.string(),
      lat: joi.number(),
      lng: joi.number(),
    },
    output: {
      200: {
        body: {
          users: joi.array().items(userSchema),
        },
      },
    },
  },
};

exports.deleteUser = {
  validate: {
    output: {
      200: {
        body: {
          success: joi.bool().valid(true),
        },
      },
    },
  },
};
