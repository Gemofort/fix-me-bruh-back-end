const Router = require('koa-router');
const perInfo = require('../controllers/index');
const accInfo = require('../controllers/accInfo');
const signIn = require('../controllers/signIn');
const search = require('../controllers/search');

const router = new Router();

router.get('', search.searchPeople);
router.get('personInfo/:id', perInfo.mainpage);
router.get('accInfo/:id', accInfo.accInfo);
router.get('signIn', signIn.signIn);
router.get('search', search.searchPeople);
router.post('search', search.sortPeople);

module.exports = router;
