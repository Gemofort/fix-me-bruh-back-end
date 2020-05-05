const Router = require('koa-joi-router');

const joi = Router.Joi;

exports.categories = {
  validate: {
    type: 'json',
    output: {
      200: {
        body: {
          categories: joi.array().items({
            _id: joi.any().required(),
            name: joi.string().required(),
          }),
        },
      },
    },
  },
};
