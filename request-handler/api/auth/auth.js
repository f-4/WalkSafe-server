
import express from 'express';
import bodyParser from 'body-parser';

import session from 'express-session';
import passport from 'passport';


const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// UNCOMMENT THIS AUTH ROUTE FOR TESTING
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/facebook' }),
  (req, res) => res.redirect('walksafe://login?user=' + JSON.stringify(req.user)));

router.get('/google', passport.authenticate('google', { scope: ['email profile']}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/google' }),
  (req, res) => {
    console.log('req.heyisAuthenticae auth.js', req.isAuthenticated());
    console.log('req.hey ssession', req.session);
    return res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
  });



router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    console.log('after logout req.user', req.user)
    res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
  })
})




// UNCOMMENT ENDS HERE
module.exports = router;