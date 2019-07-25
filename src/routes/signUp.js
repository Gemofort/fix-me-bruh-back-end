const Router = require('koa-router');
const signUp = require('../controllers/signUp');

const router = new Router();

router.get('/', signUp.signUp);
router.post('/', signUp.postSignUp);
router.get('/complete', signUp.complete);

module.exports = router;
