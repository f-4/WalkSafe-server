// This file handles requests to the different routes as defined in the routes folder
const api = require('./routes/api.js');
const auth = require('./routes/auth.js');
const map = require('./routes/map.js');


exports.handler = function handler(req, res) {
  // split up a request URL at every '/'
  // urlParts[0] contains the host. ex: localhost
  // urlParts[1] contains the route. ex: API
  // urlParts[2] contains the endpoint. ex: crimes
  const urlParts = req.path.split('/');

  // API route
  if (urlParts[1] === 'API' && api[req.method].hasOwnProperty(urlParts[2])) {
    // Hide this behind authentication later
    api[req.method][urlParts[2]](req)
      .then((data) => {
        res.statusCode = 200;
        res.json(data);
      })
      .catch((err) => {
        console.error('map error', err);
        res.end('There was an error', err);
      });
  // Map route
  } else if (urlParts[1] === 'map' && map[req.method].hasOwnProperty(urlParts[2])) {
    map[req.method][urlParts[2]](req)
      .then((data) => {
        res.statusCode = 200;
        res.json(data);
      })
      .catch((err) => {
        console.error('map error', err);
        res.end('There was an error');
      });
  // Authentication route
  } else if (urlParts[1] === 'auth' && auth[req.method].hasOwnProperty(urlParts[2])) {
    auth[req.method][urlParts[2]](req)
      .then((data) => {
        res.statusCode = 200;
        res.json(data);
      })
      .catch((err) => {
        console.error('map error', err);
        res.end('There was an error');
      });
  // If the request is neither API nor auth nor map send a 404
  } else {
    res.statusCode = 404;
    res.end('Nothing to see here');
  }
};
