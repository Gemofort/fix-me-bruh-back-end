const Koa = require('koa');
const views = require('koa-views');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const serve = require('koa-static');
const path = require('path');
const config = require('config');
const passport = require('./src/libs/passport/index');
require('./src/libs/mongoose');

passport.initialize();

const app = new Koa();
const router = new Router();


app.use(bodyparser({
  multipart: true,
}));

app.use(serve(path.join(__dirname, '/public')));

app.use(views(path.join(__dirname, 'src/templates'), {
  extension: 'pug',
  map: {
    pug: 'pug',
  },
}));

router.use('/', require('./src/routes/index').routes());
router.use('/passwdRec', require('./src/routes/passwdRec').routes());
router.use('/accounts', require('./src/accounts/routes').routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.get('port'));
