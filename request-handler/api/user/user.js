import express from 'express';
import db from './../../../db/config.js';

const router = express.Router();

router.get('/user', (req, res) => {
  console.log('user req id', req.query.userId);
  const userId = req.query.userId;
  db.user
    .findAll({ where: {
      google_id: userId }
    })
    .then((result) => {
      console.log('api user', result);
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
