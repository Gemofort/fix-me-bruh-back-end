const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/signIn', ctrl.signIn);
router.get('/signUp', ctrl.postSignUp);
router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.profile);
router.get('/email', ctrl.testEmail);
router.get('/users', ctrl.users);
router.get('/user', passport.authenticate('jwt', { session: false }), ctrl.user);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), ctrl.userById);

module.exports = router;
