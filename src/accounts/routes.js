const Router = require('koa-joi-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');
const validator = require('./validators');

const router = Router();

router.post('/sign-in', validator.signIn, ctrl.signIn);
router.post('/sign-up', validator.signUp, ctrl.signUp);

router.get('/search', validator.search,
  passport.authenticate('jwt', { session: false }), ctrl.search);
router.get('/user', validator.user,
  passport.authenticate('jwt', { session: false }), ctrl.user);
router.put('/user', validator.userUpdate,
  passport.authenticate('jwt', { session: false }), ctrl.updateUser);
router.delete('/user', validator.deleteUser,
  passport.authenticate('jwt', { session: false }), ctrl.deleteUser);
router.get('/user/:id', validator.user,
  passport.authenticate('jwt', { session: false }), ctrl.userById);
router.put('/user/photo', validator.updateUserPhoto,
  passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);

router.post('/verify', validator.sendVerificationCode,
  passport.authenticate('jwt', { session: false }), ctrl.sendVerificationCode);
router.put('/verify-code', validator.verifyCode,
  passport.authenticate('jwt', { session: false }), ctrl.verifyCode);
router.delete('/user/email/:id', validator.validateEmail,
  passport.authenticate('jwt', { session: false }), ctrl.validateEmail);
router.post('/user/email', validator.resendEmailVerification,
  passport.authenticate('jwt', { session: false }), ctrl.resendEmailVerification);

router.post('/user/reset-password', validator.resetPasswordRequest,
  ctrl.resetPasswordRequest);
router.put('/user/reset-password/:id', validator.resetPassword,
  ctrl.resetPassword);

module.exports = router;
