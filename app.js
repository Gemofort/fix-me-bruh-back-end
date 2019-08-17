const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const config = require('config');
const cors = require('@koa/cors');
const passport = require('./src/libs/passport/index');
require('./src/libs/mongoose');

const app = new Koa();
const router = new Router();

passport.initialize();

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
