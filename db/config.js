const Sequelize = require('sequelize');
const readModels = require('./utils/read-models.js');

// console.log('process.env.DB_URL:', process.env.DB_URL);
const sequelize = new Sequelize('walksafe', process.env.DB_USERNAME || 'postgres', process.env.DB_PASSWORD || 'root', {
  host: process.env.DB_URL || 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const db = {};

// store models into db object
readModels(db, `${__dirname}/models/base-models`, sequelize);
readModels(db, `${__dirname}/models/staging-models`, sequelize);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
