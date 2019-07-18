// eslint-disable-next-line func-names
module.exports = function (options) {
  // eslint-disable-next-line global-require
  const sass = require('node-sass-middleware')(options);
  return (ctx, next) => new Promise((resolve, reject) => {
    sass.call(sass, ctx.req, ctx.res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(next());
      }
    });
  });
};
