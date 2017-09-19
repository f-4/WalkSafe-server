import { google, facebook } from './../config';

// import express from'express';
import db from'../db/config';

import { express, router } from'./api/api.js';
import session from'express-session';

import passport from'passport';
import GoogleStrategy from'passport-google-oauth20';
import FacebookStrategy from'passport-facebook';

import bodyParser from 'body-parser';
import Users from'./../db/collections/users.js';
import util from './util/utility';

const app = express();


app.use(session({
  secret: 'In da hood',
  resave: true,
  saveUninitialized: true,
}));



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
        done (null, user);
      } else {
        let newUser = await Users.createNewUser(transformGoogleEmail(email._json));
        done (null, newUser);
      }
    }
));

// serializeUser into sessions
passport.serializeUser((user, done) => done(null, user));

// deserialize user from sessions
passport.deserializeUser((user, done) => done(null, user));



// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());



app.use('/api', router);
// THIS IS A BAD WAY TO SAVE SESSIONS
// USE A DIFFERENT METHOD FOR PRODUCTION


module.exports = app;
