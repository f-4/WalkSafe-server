import express from 'express';
import db from './../../../db/config.js';
const router = express.Router();

router.get('/user', (req, res) => {
  console.log('api/user/user get request', req.session);
  const userId = '107291565452880607951';
  db.user
    .findAll({ where: {
      google_id: userId }
    })
    .then(result => {
      console.log('api user', result);
      res.send(result);
    })
    .catch(console.error);
});

module.exports = router;
