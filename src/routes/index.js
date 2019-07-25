const Router = require('koa-router');
const perInfo = require('../controllers/index');
const accInfo = require('../controllers/accInfo');
const signIn = require('../controllers/signIn');

const router = new Router();

router.get('', perInfo.loadMainpage);
router.get('personInfo/:id', perInfo.loadMainpage);
router.get('accInfo/:id', accInfo.loadAccInfo);
router.get('signIn', signIn.loadSignIn);

module.exports = router;
