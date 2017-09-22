import express from 'express';
import db from './../../../db/config.js';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.urlencoded( {extended: true }));
router.use(bodyParser.json());

router.get('/contacts', (req, res) => {
  //hard code for now wait for passport session to be resolved
  // const userId = '107291565452880607951'
  const userId = req.query.userId;
  console.log('GET contacts user id', userId);

  db.user
    .findAll({
      where: {
        google_id: userId
      },
      include:[{
        model: db.contact
      }]
    })
    .then(result => {
      console.log('what is the result', result);
      var contacts;
      if (result.length !== 0) {
        contacts = result[0].contacts;
      } else {
        contacts = result;
      }
      console.log('get contacts result', contacts);
      res.send(contacts);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/contacts', (req, res) => {

  const userId = req.body.userId;
  const contactName = req.body.contactName;
  const contactNumber = req.body.contactNumber;
<<<<<<< 39881ace9acc9a880a138d59cd04c9b9ed138c7e

=======
>>>>>>> Delete contacts
  console.log('POST contacts user id', userId);
  console.log('contactNumber', contactNumber, typeof contactNumber);

  db.user
    .findAll({
      attributes: ['id'],
      where: {
        google_id: userId
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
    .catch((err) => {
      console.error(err);
    })
});

router.delete('/contacts', (req, res) => {
  const contactName = req.query.contact_name;
  const google_id = req.query.user_id;
  console.log('delete contacts', google_id);
  db.user
  .findAll({
    attributes: ['id'],
    where: {
      google_id: google_id
    }
  })
  .then(id => {
    console.log('line78', id[0].id)
     db.contact
      .destroy({where: {contact_name: contactName, userId: id[0].id}})
      .then((total) => {
        console.log('Deleted total number of contacts', total);
        res.send(`${total} contact has been deleted`);
      });
    })
  .catch(console.error)

});

export default router;
