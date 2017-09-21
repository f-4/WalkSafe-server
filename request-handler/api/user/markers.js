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

router.post('/markers', (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  db.user
    .findAll({
      attributes: ['id'],
      where: {
        google_id: userId
      }
    })
    .then(id => {
      db.marker
      .findAll({where: {subtitle: subtitle, userId: id[0].id}})
      .then(result => {
        if (result.length === 0){
          db.marker.create({
              userId: id[0].id,
              title: title,
              subtitle: subtitle,
              latitude: latitude,
              longitude: longitude
            })
            .then((result) => {
              console.log('Server POST marker success', result);
              res.send(result);
            })
            .catch((error) => {
              console.log('Server POST marker error: ', error);
              res.end('marker POST error');
            });
        } else {
          res.send('marker already exists');
        }
      })
    })
    .catch(console.error);
});

router.delete('/markers', (req, res) => {
  const userId = req.query.userId;
  const subtitle = req.query.subtitle;
  db.user
  .findAll({
    attributes: ['id'],
    where: {
      google_id: userId
    }
  })
  .then(id => {
     db.marker
      .destroy({where: {subtitle: subtitle, userId: id[0].id}})
      .then((count) => {
        console.log(`Deleted ${count} marker(s)`);
        res.send(`${count} marker(s) has been deleted`);
      });
    })
  .catch(console.error);
});

module.exports = router;
