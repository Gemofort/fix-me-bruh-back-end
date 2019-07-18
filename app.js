const Koa = require('koa');
const views = require('koa-views');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const sass = require('./sassConverter');

const app = new Koa();
const router = new Router();

app.use(sass({
  src: path.join(__dirname, 'src/styles/sass'),
  dest: './public/css',
  debug: true,
  outputStyle: 'compressed',
}));

app.use(views(path.join(__dirname, 'src/templates'), {
  extension: 'pug',
  map: {
    pug: 'pug',
  },
}));

app.use(serve(path.join(__dirname, '/public')));

router.use('/', require('./src/routes').routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 8000;
app.listen(PORT);
