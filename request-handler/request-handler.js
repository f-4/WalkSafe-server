const express = require('express');
const db = require('../db/config');
const routers = require('./api/api.js');
// const {passport, session} = require('./api/auth/auth.js');
const session = require('express-session');
const passport = require('passport');
const app = express();

console.log('make env woasdasdrk')

app.use(session({
  secret: 'In da hood',
  resave: false,
  saveUninitialized: true,
}));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routers);
// THIS IS A BAD WAY TO SAVE SESSIONS
// USE A DIFFERENT METHOD FOR PRODUCTION


module.exports = app;
