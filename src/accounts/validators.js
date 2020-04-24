const Router = require('koa-joi-router');

const joi = Router.Joi;

exports.signUp = {
  validate: {
    type: 'json',
    body: {
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      phoneNumber: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().min(6),
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
