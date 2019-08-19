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
    url: 'https://koa-demo.herokuapp.com/docs.yml',
  },
}));

app.use(cors());

app.use(bodyparser({
  multipart: true,
}));

router.use('/categories', require('./src/categories/routes').routes());
router.use('/accounts', require('./src/accounts/routes').routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.get('port'));
