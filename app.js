const Koa = require('koa');
const koaSwagger = require('koa2-swagger-ui');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const serve = require('koa-static');
const config = require('config');
const cors = require('@koa/cors');
const passport = require('./src/libs/passport/index');
const errorCatcherMiddleware = require('./src/middlewares/errorCatcher');
require('./src/libs/mongoose');

const app = new Koa();
const router = new Router();

passport.initialize();

app.use(serve('src/docs'));
app.use(koaSwagger({
  routePrefix: '/docs',
  hideTopbar: true,
  swaggerOptions: {
    url: `${config.get('server.baseUrl')}/docs.yml`,
  },
}));

app.use(cors());

app.use(bodyparser({
  multipart: true,
}));

app.use(errorCatcherMiddleware);

router.use('/accounts', require('./src/accounts/routes'));
router.use('/categories', require('./src/categories/routes'));

app
  .use(router.middleware());

console.log(`Server started on ${config.get('port')} port`);

module.exports = app.listen(config.get('port'));
