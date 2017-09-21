import express from 'express';
import db from './../../../db/config.js';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.urlencoded( {extended: true }));
router.use(bodyParser.json());

router.get('/contacts', (req, res) => {
  //hard code for now wait for passport session to be resolved
  const user_id = '107291565452880607951'
  // const user_id = req.params.userId;
  db.user
    .findAll({
      where: {
        google_id:userId
      },
      include:[{
        model: db.contact
      }]
    })
    .then(result => {
      console.log(console.log('get contacts result', result[0].contacts));
      res.send(result[0].contacts);
    })
    .catch(console.error);
});

router.post('/contacts', (req, res) => {
  const user_id = req.body.user_id;
  const contactName = req.body.contactName;
  const contactNumber = req.body.contacNumber;
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

router.delete('/contacts', (req, res) => {
  const contactName = 'abc';
  const user_id = null;
  db.contact
    .destroy({where: {contact_name: contactName, userId: user_id}})
    .then((total) => {
      console.log('Deleted total number of contacts', total);
      res.send(`${total} contact has been deleted`);
  });
});

module.exports = router;
