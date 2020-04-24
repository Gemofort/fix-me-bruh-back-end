const Router = require('koa-joi-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');
const validator = require('./validators');

const router = Router();

router.post('/sign-in', validator.signIn, ctrl.signIn);
router.post('/sign-up', validator.signUp, ctrl.signUp);
// router.post('/email', ctrl.testEmail);
// router.get('/users', passport.authenticate('jwt', { session: false }), ctrl.users);
router.get('/user', validator.user,
  passport.authenticate('jwt', { session: false }), ctrl.user);
// router.put('/user', passport.authenticate('jwt', { session: false }), ctrl.updateUser);
router.get('/user/:id', validator.user,
  passport.authenticate('jwt', { session: false }), ctrl.userById);
router.put('/user/photo', validator.updateUserPhoto,
  passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);

module.exports = router;
