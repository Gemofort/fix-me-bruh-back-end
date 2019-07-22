const Router = require('koa-router');
const signUp = require('../controllers/signUp');

const router = new Router();

router.get('/', signUp.loadSignUp);
router.post('/', signUp.postSignUp);
router.get('/complete', signUp.loadComplete);

module.exports = router;
