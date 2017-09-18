import express from 'express';
import db from './../../../db/config.js';
const router = express.Router();

router.get('/contacts', (req, res) => {
  const userId = '107291565452880607951'
  // ADD DB QUERY HERE
  db.users
    .findAll({
      where: {
        contacts: req.params.input
      }
    })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(console.error);
});

router.post('/contacts', (req, res) => {
  console.log('api/user/contacts post request', req.session);
  // ADD DB QUERY HERE
  const contactName= 'aa';
  const contactNumber= '123'
  db.users.create({
      name: contactName,
      number:contactNumber
    })
    .then((result) => {
      console.log('Server POST User success', result);
      res.send(result);
    })
    .catch((error) => {
      console.log('Server POST User error: ', error);
      res.end('User POST error');
    })
});

module.exports = router;