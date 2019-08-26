const Koa = require('koa');
const koaSwagger = require('koa2-swagger-ui');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const serve = require('koa-static');
const config = require('config');
const cors = require('@koa/cors');
const passport = require('./src/libs/passport/index');
require('./src/libs/mongoose');

const app = new Koa();
const router = new Router();

passport.initialize();

app.use(serve('docs'));
app.use(koaSwagger({
  routePrefix: '/docs',
  hideTopbar: true,
  swaggerOptions: {
    url: 'http://localhost:8000/docs.yml',
  },
}));

app.use(cors());

app.use(bodyparser({
  multipart: true,
}));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    const errors = [];
    Object.keys(err.errors).forEach((key) => {
      if (err.errors[key].kind === 'Number') {
        errors.push(`The cell ${key} must be a number.`);
      } else if (err.errors[key].kind === 'unique') {
        errors.push(`The field ${key} is already taken by this value. Please enter another value`);
      } else {
        errors.push(err.errors[key].message);
      }
    });
    ctx.status = 500;
    ctx.body = {
      error: errors,
    };
  }
});

router.use('/categories', require('./src/categories/routes').routes());
router.use('/accounts', require('./src/accounts/routes').routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.get('port'));
