
import express from 'express';
import bodyParser from 'body-parser';

import session from 'express-session';
import passport from 'passport';


const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use((req, res, next) => {console.log('auth.js, line14', req.session); next()});
// UNCOMMENT THIS AUTH ROUTE FOR TESTING
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/facebook' }),
  (req, res) => res.redirect('walksafe://login?user=' + JSON.stringify(req.user)));

router.get('/google', passport.authenticate('google', { scope: ['email profile']}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/google' }),
  (req, res) => {
    console.log('req.isAuthenticae auth.js', req.isAuthenticated());
    console.log('req.session', req.session);
    console.log('req.sessionline 29 user', req.user);
    return res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
  });



router.get('/logout', (req, res, next) => {
  console.log('hey')
  // req.session.destroy((err) => {
  //   if (err) return next(err);
  //   req.logout();
  //   console.log('after logout req.user', req.user)
  //   res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
  // })
})




// UNCOMMENT ENDS HERE
module.exports = router;