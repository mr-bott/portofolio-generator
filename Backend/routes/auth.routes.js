const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/auth.controller');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  controller.googleCallback
);



// router.get('/logout', controller.logout);

module.exports = router;
