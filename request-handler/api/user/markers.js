import express from 'express';
import db from './../../../db/config.js';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.urlencoded( {extended: true }));
router.use(bodyParser.json());

module.exports = router;
