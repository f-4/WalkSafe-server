import express from 'express';
import mapbox from 'mapbox';
import axios from 'axios';


var router = express.Router();

router.use('/auth', require('./auth/auth.js'));
router.use('/map', require('./map/map.js'));
router.use('/user', require('./user/user.js'));

module.exports = router;
