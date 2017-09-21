import express from 'express';
import db from './../../../db/config.js';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.urlencoded( {extended: true }));
router.use(bodyParser.json());

router.get('/markers', (req, res) => {
  const userId = req.query.userId;
  db.user
    .findAll({
      where: {
        google_id: userId
      },
      include:[{
        model: db.marker
      }]
    })
    .then(result => {
      console.log(console.log('get markers result', result[0].markers));
      res.send(result[0].markers);
    })
    .catch(console.error);
});

module.exports = router;
