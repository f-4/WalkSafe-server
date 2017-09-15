// This file handles GET and POST requests for authentication routes

// possibly include database here for sessions
// const db = require('../../db/config');
import { passport, authenticateFb, authenticateGoogle, callbackGoogle, callbackFb } from '../../authentication';
// const passport = require('../../authentication').passport;

module.exports = {
  GET: {
    google: function authenticateGoogleFunc(req, res) {
      if (req.url === '/auth/google') {
        authenticateGoogle(req, res);
      } else if (req.url === '/auth/google/callback') {
        callbackGoogle(req, res);
      } else {
        res.end('Not a valid URL');
      }
    },
    facebook: function authenticateFacebookFunc(req, res) {
      if (req.url === '/auth/facebook') {
        // console.log('WHAT IS AUTHENTICATE FACEBOOK req:', req);
        authenticateFb(req, res);
      } else if (req.url === '/auth/facebook/callback') {
        callbackFb(req, res);
      } else {
        res.end('Not a valid URL');
      }
    },
  },
  POST: {

  },
};
