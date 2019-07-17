const Router = require('koa-router');
const ctrl = require('../controllers/');

const router = new Router();

router.get('home', ctrl.loadMainpage);

module.exports = router;
