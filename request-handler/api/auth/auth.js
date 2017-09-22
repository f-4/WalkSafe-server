import express from 'express';
import session from 'express-session';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.use((req, res, next) => {console.log('auth.js, line14', req.session); next()});
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/facebook' }),
  (req, res) => {

    //Add a token
    let userToken = jwt.sign({
      user: req.user
    }, 'in da hood');

    //return token and user
    return res.redirect(`walksafe://login?token=${JSON.stringify(userToken)}&user=${JSON.stringify(req.user)}`);
  }
);

router.get('/google', passport.authenticate('google', { scope: ['email profile'] }));

// NEW HOTNESS
router.get('/google/callback',
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
      console.log('Google auth callback userToken', userToken);
      console.log('Google auth callback req user', req.user);
      return res.redirect(`walksafe://login?token=${JSON.stringify(userToken)}&user=${JSON.stringify(req.user)}`);
    });
});

router.get('/logout', (req, res, next) => {
  // req.session.destroy((err) => {
  //   if (err) return next(err);
  //   req.logout();
  //   console.log('after logout req.user', req.user)
  //   res.redirect('walksafe://login?user=' + JSON.stringify(req.user));
  // })
})

export default  router;
