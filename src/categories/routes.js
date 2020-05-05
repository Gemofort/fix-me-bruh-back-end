const Router = require('koa-joi-router');
const ctrl = require('./controllers');
const validators = require('./validators');

const router = Router();

router.get('/', validators.categories, ctrl.categories);

module.exports = router;
