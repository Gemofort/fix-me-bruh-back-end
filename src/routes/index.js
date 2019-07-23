const Router = require('koa-router');
const perInfo = require('../controllers/index');
const accInfo = require('../controllers/accInfo');
const signIn = require('../controllers/signIn');

const router = new Router();

router.get('', perInfo.loadMainpage);
router.get('personInfo', perInfo.loadMainpage);
router.get('accInfo', accInfo.loadAccInfo);
router.get('signIn', signIn.loadSignIn);

module.exports = router;
