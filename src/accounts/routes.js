const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/sign-in', ctrl.signIn);
router.post('/sign-up', ctrl.signUp);
router.post('/email', ctrl.testEmail);
router.get('/users', passport.authenticate('jwt', { session: false }), ctrl.users);
router.get('/user', passport.authenticate('jwt', { session: false }), ctrl.user);
router.put('/user', passport.authenticate('jwt', { session: false }), ctrl.updateUser);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), ctrl.userById);
router.put('/user/photo', passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);

module.exports = router;
