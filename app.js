const Koa = require('koa');
const views = require('koa-views');
const Router = require('koa-router');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(views(path.join(__dirname, 'src/templates'), {
  extension: 'njk',
  map: {
    njk: 'nunjucks',
  },
}));

app.use(async (ctx, next) => {
  console.log('ping');
  console.log(ctx.response);
  await next();
  console.log(ctx.response);
});

router.use('/', require('./src/routes').routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8000, () => {
  console.log('Server started...');
});
