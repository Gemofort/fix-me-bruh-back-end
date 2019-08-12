const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/signIn', ctrl.signIn);
router.get('/signUp', ctrl.postSignUp);
router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.profile);

module.exports = router;
