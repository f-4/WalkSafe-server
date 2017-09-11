// This file handles GET and POST requests for authentication routes

// possibly include database here for sessions
// const db = require('../../db/config');
const passport = require('../../authentication');

module.exports = {
  GET: {
    google: function authenticateGoogle(req, res) {
      if (req.url === '/auth/google') {
        passport.authenticateGoogle(req, res);
      } else if (req.url === '/auth/google/callback') {
        passport.callbackGoogle(req, res);
      } else {
        res.end('Not a valid URL');
      }
    },
    facebook: function authenticateFacebook(req, res) {
      if (req.url === '/auth/facebook') {
        passport.authenticateFacebook(req, res);
      } else if (req.url === '/auth/facebook/callback') {
        passport.callbackFb(req, res);
      } else {
        res.end('Not a valid URL');
      }
    },
  },
  POST: {

  },
};
