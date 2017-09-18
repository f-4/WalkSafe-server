import express from 'express';
import mapbox from 'mapbox';
import axios from 'axios';
import util from './../util/utility';
//import express from './../../api/api.js';
import passport from'passport';

var router = express.Router();

router.use('/map', require('./map/map.js'));
router.use('/auth', require('./auth/auth.js'));
router.use('/user', require('./user/user.js'));

module.exports = router;
