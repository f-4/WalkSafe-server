require('dotenv').config();
const app = require('./request-handler/request-handler.js');

const port = process.env.PORT || 1337;
const host = process.env.HOST || '127.0.0.1';

const server = app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`);
});
