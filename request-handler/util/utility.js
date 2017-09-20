const passport = require('passport');

const isLoggedIn = function (req, res, next) {
  console.log('map.js req.session', req.session)
  console.log('map.js req isAuthenticated', req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  }
  // res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
};

exports.checkUser = function(req, res, next) {
  if (!isLoggedIn(req)) {
    res.redirect('walksafe://');
  } else {
    console.log('utility, next')
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};
