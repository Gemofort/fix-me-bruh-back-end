const Router = require('koa-router');
const perInfo = require('../controllers/index');
const accInfo = require('../controllers/accInfo');
const signIn = require('../controllers/signIn');

const router = new Router();

router.get('', perInfo.mainpage);
router.get('personInfo/:id', perInfo.mainpage);
router.get('accInfo/:id', accInfo.accInfo);
router.get('signIn', signIn.signIn);

module.exports = router;
