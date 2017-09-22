import { google, facebook } from './../config';

import express from'express';
import session from'express-session';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';

import mapbox from 'mapbox';
import axios from 'axios';
import Users from './../db/collections/users.js';
import util from './util/utility';

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';

console.log('Initalizing express in request-handler heyhey');
const app = express();

// // Passport session
// app.use(session({
//   secret: 'In da hood',
//   resave: false,
//   saveUninitialized: true
// }));

// JWT session
app.use(expressJWT({
  secret: 'in da hood'
}).unless({
  path: ['/api/auth/google', '/api/auth/google/callback', '/api/auth/facebook', '/api/auth/facebook/callback']
}));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

// Map stuff
const mapboxClient = new mapbox(process.env.MAPBOX_ACCESS_TOKEN);
const crimeSpot =  (input) => {
  return new Promise ((resolve, reject) => {
    axios.get('http://api.spotcrime.com/crimes.json',
      { params: {
          lat: input.lat,
          lon: input.lon,
          key: process.env.SPOTCRIME_API_KEY,
          radius: 0.01
        }})
      .then(result => {
        // Map crimes into annotation objects
        const crimes = result.data.crimes.map(crime => {
          return {
            coordinates: [crime.lat, crime.lon],
            type: 'point',
            title: crime.type,
            subtitle: `${crime.address} ${crime.date}`,
            annotationImage: {
              source: { uri: crime.type.toLowerCase() },
              height: 45,
              width: 45
            },
            id: crime.cdid.toString()
          }
        });
        // Return array of mapped crimes
        console.log('crimes', crimes);
        resolve(crimes);
      })
      .catch(err => {
        console.log('line 52 ', err);
        resolve(err);
      });
  })
};


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
        done (null, transformGoogleEmail(email._json));
      }
    }
));

// serializeUser into sessions
passport.serializeUser((user, done) => done(null, user));

// deserialize user from sessions
passport.deserializeUser((user, done) => done(null, user));


app.get('/api/auth/facebook', passport.authenticate('facebook'));

app.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/facebook' }),
  (req, res) => res.redirect('walksafe://login?user=' + JSON.stringify(req.user)));

app.get('/api/auth/google', passport.authenticate('google', { scope: ['email profile']}));


// OLD WAY
// app.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/google' }),
//   (req, res) => {
//     console.log('req.isAuthenticae auth.js', req.isAuthenticated());
//     console.log('req.session', req.session);
//     console.log('what is the req objecct after auth:', req.login);
//     return res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
//   });

// NEW HOTNESS
app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/google' }),
  (req, res, next) => {
    console.log('Google auth user', req.user);
    req.logIn(req.user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('Google auth callback req session', req.session);

      //Add a token
      let userToken = jwt.sign({
        user: req.user
      }, 'in da hood');
      return res.redirect(`walksafe://login?user=${JSON.stringify(userToken)}`)
    });
});

app.get('/api/auth/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    console.log('after logout req.user', req.user)
    res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
  })
});

app.get('/api/map/search', (req, res) => {
  const address = req.query.address;
  console.log('line 46 map.js server search evoked req.session', req.session)
  mapboxClient.geocodeForward(address, (err) => {
    if (err) { console.log(err) }
  })
    .then( result => {
      console.log('Return search result', result.entity.features[0]);
      res.send(result.entity.features[0]);
    })
});

app.get('/api/map/crimes', (req, res) => {
  console.log('api crimes req session', req.session);
  console.log('is this authenticated', req.isAuthenticated());
  crimeSpot(req.query)
    .then(crimes => {
      console.log(crimes)
      res.send(crimes);
    })
    .catch(err => res.status(404).send('Bad Request'))
})


module.exports = app;
