import { google, facebook } from './../config';
import { passport } from '../authentication/index';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/config');
const routes = require('./request-handler.js');
const session = require('express-session');


// // UNCOMMENT THIS FOR TESTING AUTHENTICATION

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// const FacebookStrategy = require('passport-facebook');
//
// const transformFacebookProfile = profile => ({
//   name: profile.name,
//   avatar: profile.picture.data.url,
// });
//
// const transformGoogleProfile = profile => ({
//   name: profile.displayName,
//   avatar: profile.image.url,
//   // maybe add email here
// });
//
// // console.log('What is google', google);
// // console.log('What is facebook', FacebookStrategy);
//
// // Register Facebook Passport strategy
// passport.use(new FacebookStrategy(facebook,
//   // Called when user authorizes access to their profile
//   async (accessToken, refreshToken, profile, done)
//   // Return done callback and pass the profile to the transform callback
//     => done (null, transformFacebookProfile(profile._json))
// ));
//
// passport.use(new GoogleStrategy(google,
//   async (accessToken, refreshToken, profile, done)
//     => done (null, transformGoogleProfile(profile._json))
// ));
//
// // serializeUser into sessions
// passport.serializeUser((user, done) => done(null, user));
//
// // deserialize user from sessions
// passport.deserializeUser((user, done) => done(null, user));
//
// //UNCOMMENT ENDS HERE


const app = express();

// THIS IS A BAD WAY TO SAVE SESSIONS
// USE A DIFFERENT METHOD FOR PRODUCTION

app.use(session({
  secret: 'In da hood',
  resave: false,
  saveUninitialized: true,
}));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Start body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// // UNCOMMENT THIS AUTH ROUTE FOR TESTING
// app.get('/auth/facebook', passport.authenticate('facebook'));
//
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: 'auth/facebook' }),
//   (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));
//
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile']}));
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: 'auth/google' }),
//   (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));
// // UNCOMMENT ENDS HERE


// Use the request-handler
app.use(routes.handler);

module.exports = app;
