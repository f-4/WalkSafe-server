import express from 'express';
import db from './../../../db/config.js';

const router = express.Router();

router.get('/contacts', (req, res) => {
  console.log('api/user/contacts get request', req);
  res.send('test get request for /contacts');
  // ADD DB QUERY HERE
  // EXAMPLE
  // db.myTable
  //   .findOne({value: req.params.input})
  //   .then(result=> res.send(result))
  //   .catch(console.error);
});

router.post('/contacts', (req, res) => {
  console.log('api/user/contacts post request', req);
  res.send('test post request for /contacts');
  // ADD DB QUERY HERE
  // EXAMPLE
  // const contactName= req.params.contactName;
  // db.myTable.create({
  //     name: input,
  //     number:input
  //   })
  //   .then((result) => {
  //     console.log('Server POST User success', UserData);
  //     res.send(recipeData);
  //   })
  //   .catch((error) => {
  //     console.log('Server POST User error: ', error);
  //     res.end('User POST error');
  //   })
});

module.exports = router;
