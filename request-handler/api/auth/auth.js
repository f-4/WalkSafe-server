import { google, facebook } from './../../../config';
import express from 'express';
// import User from '';
// UNCOMMENT THIS FOR TESTING AUTHENTICATION
const router = express.Router();
const bodyParser = require('body-parser');

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

const Users = require('./../../../db/collections/users.js');

const transformFacebookProfile = profile => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

const transformGoogleEmail = email => ({
  name: email.displayName,
  avatar: email.image.url,
  email: email.emails[0].value,
  google_id: email.id,
});


// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook,
  // Called when user authorizes access to their email
  async (accessToken, refreshToken, email, done)
  // Return done callback and pass the email to the transform callback
    => {
      done (null, transformFacebookEmail(email._json));
    }
));

//done (null, transformGoogleEmail(email._json);
passport.use(new GoogleStrategy(google,
  async (accessToken, refreshToken, email, done)
    => {
      let user = await Users.getExistUser(email.id);
      if(user) {
        done (null, transformGoogleEmail(email._json));
      } else {
        let newUser = await Users.createNewUser(transformGoogleEmail(email._json))
        done (null, newUser);
      }
    }
));

// serializeUser into sessions
passport.serializeUser((user, done) => done(null, user));

// deserialize user from sessions
passport.deserializeUser((user, done) => done(null, user));


// // THIS IS A BAD WAY TO SAVE SESSIONS
// // USE A DIFFERENT METHOD FOR PRODUCTION

// router.use(session({
//   secret: 'In da hood',
//   resave: false,
//   saveUninitialized: true,
// }));


// // Initialize Passport
// router.use(passport.initialize());
// router.use(passport.session());

// Start body parser
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