// Is this still being used?

const express = require('express');
const db = require('../db/config');
const routers = require('./api');
const app = express();

app.use('/api', routers);


module.exports = app;
