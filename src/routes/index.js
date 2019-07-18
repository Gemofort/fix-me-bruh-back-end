const Router = require('koa-router');
const ctrl = require('../controllers/');

const router = new Router();

router.get('', ctrl.loadMainpage);

module.exports = router;
