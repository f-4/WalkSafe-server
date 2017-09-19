import express from 'express';
import db from './../../../db/config.js';
const router = express.Router();

router.get('/contacts', (req, res) => {
  const user_id = '107291565452880607951';
  db.user
    .findAll({
      where: {
        google_id:user_id
      },
      include:[{
        model: db.contact
      }]
    })
    .then(result => {
      console.log(result.contacts);
      res.send(result[0].contacts);
    })
    .catch(console.error);
});

router.post('/contacts', (req, res) => {
  const user_id = '107291565452880607951';
  const contactName = 'CCCD';
  const contactNumber = '123';
  db.user
    .findAll({
      attributes: ['id'],
      where: {
        google_id: user_id
      }
    })
    .then(id => {
      db.contact
      .findAll({where: {contact_name: contactName, userId: id[0].id}})
      .then(result => {
        if (result.length === 0){
          db.contact.create({
              contact_name: contactName,
              phone_number: contactNumber,
              userId: id[0].id,
            })
            .then((result) => {
              console.log('Server POST contacts success', result);
              res.send(result);
            })
            .catch((error) => {
              console.log('Server POST contacts error: ', error);
              res.end('contacts POST error');
            })
        } else {
          res.send('contacts already exists');
        }
      })
    })
    .catch(console.error)
});

module.exports = router;