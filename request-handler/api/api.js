import express from 'express';
import mapbox from 'mapbox';
import util from './../util/utility';
import passport from'passport';

const router = express.Router();

router.use('/auth', require('./auth/auth.js'));
router.use('/map', require('./map/map.js'));
router.use('/user', require('./user/user.js'));
router.use('/user', require('./user/contacts.js'));
router.use('/user', require('./user/markers.js'));

export { express, router };
