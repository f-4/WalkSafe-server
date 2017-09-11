require('dotenv').config();
const db = require('./config.js');
const path = require('path');
// const Promise = require('bluebird');

/* INSERTING DATA QUERY START */

// LA SAMLL FILE
/**
  * const filePathLA = path.join(__dirname, '/CSV/staging-la.csv');
  * const queryStringLA =
  * `COPY staging_las (lurn_sak , incident_date , stat ,
  * stat_desc , street , city , zip , xy_point , incident_id ,
  * reporting_district , seq , unit_id , unit_name) FROM '' +
  * filePathLA + '' DELIMITER '#' CSV HEADER;`
*/


// SF FINAL FILE
const filePathSF = path.join(__dirname, '/csv/staging-sf.csv');
const queryStringSF =
  `COPY staging_sfs (incident_num, category, date, time, address, x, y, location)
  FROM '${filePathSF}' DELIMITER ',' CSV HEADER;`;


// LACOUNTY FINAL FILE
const filePathLACounty = path.join(__dirname, '/csv/staging-la-county.csv');
const queryStringLACounty =
  `COPY staging_la_counties (crime_date, crime_year, crime_category_number,
  crime_category_description, street, city, state, zip,
  latitude, longitude, reporting_district, crime_identifier, location)
  FROM '${filePathLACounty}' DELIMITER ',' CSV HEADER;`;
/* INSERTING DATA QUERY END */


/* DELETING EMPTY DATA QUERY START */
const queryStringCleanUpLACounty = 'DELETE FROM staging_la_counties WHERE longitude IS null;';
/* DELETING EMPTY DATA QUERY END */


/* ALTER TABLE QUERY START */
const queryStringFinalizeLACounty =
  `INSERT INTO crime_la_counties (crime_type, crime_time, longitude, latitude, crime_identifier, address)
  SELECT crime_category_number, crime_date, longitude, latitude, crime_identifier, location
  from staging_la_counties;`;
const queryStringTransfromGeomLACounty=
  `UPDATE crime_la_counties SET geometry = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);`

/* NOT DONE FOR SF */
// const queryStringFinalizeSF=
//   `INSERT INTO crime_sfs (crime_type, crime_time, longitude, latitude, crime_identifier, address)
//   SELECT crime_category_number, crime_date, longitude, latitude, crime_identifier, location
//   from staging_la_counties;`;
// incidentnum,category,date,time,address,x,y,location

/* ALTER TABLE QUERY END */


/* DB SYNC START */
db.sequelize.sync({
  force: true,
})
  .then(() => db.user.create({
    username: 'Fantastic4',
    email: 'fantastic4@gmail.com',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/31486494?v=4&s=200',
    accessToken: 'abc123',
    contacts: [
      {
        contact_name: 'Human Torch',
        phone_number: 1234567890,
      },
      {
        contact_name: 'The Thing',
        phone_number: 10000000000,

      },
      {
        contact_name: 'Mr. Fantastic',
        phone_number: 1111112222,
      },
      {
        contact_name: 'Ms. Fantastic',
        phone_number: 2222222222,
      },
    ],
  }, {
    include: [db.contact],
  }))
  .then(() => db.crime_type.bulkCreate([
    { type: 'CRIMINAL HOMICIDE' },
    { type: 'FORCIBLE RAPE' },
    { type: 'ROBBERY' },
    { type: 'AGGRAVATED ASSAULT' },
    { type: 'BURGLARY' },
    { type: 'LARCENY THEFT' },
    { type: 'GRAND THEFT AUTO' },
    { type: 'ARSON' },
    { type: 'FORGERY' },
    { type: 'FRAUD AND NSF CHECKS' },
    { type: 'SEX OFFENSES FELONIES' },
    { type: 'SEX OFFENSES MISDEMEANORS' },
    { type: 'NON-AGGRAVATED ASSAULTS' },
    { type: 'WEAPON LAWS' },
    { type: 'OFFENSES AGAINST FAMILY' },
    { type: 'NARCOTICS' },
    { type: 'LIQUOR LAWS' },
    { type: 'DRUNK / ALCOHOL / DRUGS' },
    { type: 'DISORDERLY CONDUCT' },
    { type: 'VAGRANCY' },
    { type: 'GAMBLING' },
    { type: 'DRUNK DRIVING VEHICLE / BOAT' },
    { type: 'VEHICLE / BOATING LAWS' },
    { type: 'VANDALISM' },
    { type: 'WARRANTS' },
    { type: 'RECEIVING STOLEN PROPERTY' },
    { type: 'FEDERAL OFFENSES W/O MONEY' },
    { type: 'FEDERAL OFFENSES WITH MONEY' },
    { type: 'FELONIES MISCELLANEOUS' },
    { type: 'MISDEMEANORS MISCELLANEOUS' },
  ]))
  .then(() => db.sequelize.query(queryStringSF))
  .then(() => db.sequelize.query(queryStringLACounty))
  .then(() => db.sequelize.query(queryStringCleanUpLACounty))
  .then(() => db.sequelize.query(queryStringFinalizeLACounty))
  .then(() => db.sequelize.query(queryStringTransfromGeomLACounty))
  .then(() => db.sequelize.close());
/* DB SYNC END */


/* CLEAN STAGING TABLES RAW QUERY START */
/* CONCACT TWO COLUMN VALUE */
/*
  INSERT INTO crimes
  SELECT concat_ws(', ', street::text, city::text, state::text) AS address FROM staging_la_counties;
  */

/* INSERTING DATA IN pgADMIN4 START */
/* *
   * COPY staginglas (lurn_sak , incident_date , stat , stat_desc ,
   * street , city , zip , xy_point , incident_id , reporting_district , seq , unit_id , unit_name)
   * FROM '/Users/FloweryPao/Documents/keepSafe-Server/db/CSV/stagingla.csv'
   DELIMITER '#' CSV HEADER;
  /* RAW QUERY, IN pgADMIN4. END */


/* csvHandler use when initial setup */
/*
  const csvhandler = require('./csv/csv-handler');
  csvhandler();
  */
/* csvHandler use when initial setup */
/* CLEAN STAGING TABLES RAW QUERY END */
