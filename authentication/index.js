import { google, facebook } from './../config';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
// // possibly add database here for saving usernames and contacts
// const db = require('../db');
console.log('Authentication should not be loading');

const transformFacebookProfile = profile => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

const transformGoogleProfile = profile => ({
  name: profile.displayName,
  avatar: profile.image.url,
});


// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook,
  // Called when user authorizes access to their profile
  async (accessToken, refreshToken, profile, done)
  // Return done callback and pass the profile to the transform callback
    => done (null, transformFacebookProfile(profile._json))
));

// Register Google Passport strategy
passport.use(new GoogleStrategy(google,
  (accessToken, refreshToken, profile, done) => {
    //  POSSIBLY ADD DB QUERY HERE
    return done(null, transformGoogleProfile(profile._json));
  },
));

// serializeUser into sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize user from sessions
passport.deserializeUser((user, done) => {
  console.log('AUTHENTICATION HERE BE THE USERS:', user);
  const userInfo = {
    displayName: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
  done(null, userInfo);
});

// Export regular passport module as used by request-handler
exports.passport = passport;

// Tell passport to use Google/FB strategy and set scope for Googl
exports.authenticateFb = passport.authenticate('facebook');
exports.authenticateGoogle = passport.authenticate('google', { scope: ['profile'] });

// Handle callback URL after GitHub authentication
exports.callbackFb = (req, res) => passport.authenticate('facebook', {
  failureRedirect: 'auth/facebook' })(req, res, () => res.redirect(`walksafe://login?user=${JSON.stringify(req.user)}`));

exports.callbackGoogle = (req, res) => passport.authenticate('google', {
  failureRedirect: 'auth/google' })(req, res, () => res.redirect(`walksafe://login?user=${JSON.stringify(req.user)}`));
