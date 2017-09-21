require('dotenv').config();
const db = require('./config.js');
const path = require('path');

// INSERT USER AND CRIME CATEGORY
const dbcreatUser = () => db.user.create({
<<<<<<< 2151ad8a86bd572cbb894ef707bfbd7d18e6e6c6
      username: 'sonrisa chen',
      email: 'fantastic4@gmail.com',
      avatar: 'https://avatars2.githubusercontent.com/u/31486494?v=4&s=200',
      accessToken: 'abc123',
      google_token:'abc12345',
      google_id:'107291565452880607951',
      contacts: [
        {
          contact_name: 'Human Torch',
          phone_number: 1234567890,
        },
        {
          contact_name: 'The Thing',
          phone_number: 10000000000

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
    });
=======
  username: 'Fantastic4',
  email: 'fantastic4@gmail.com',
  avatar: 'https://avatars2.githubusercontent.com/u/31486494?v=4&s=200',
  accessToken: 'abc123',
  google_token: 'abc12345',
  google_id: '123',
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
});
>>>>>>> ESlint files
const dbcrimeType = () => db.crime_type.bulkCreate([
  { type: 'CRIMINAL HOMICIDE' },
  { type: 'FORCIBLE RAPE' },
  { type: 'ROBBERY' },
  { type: 'ASSAULT' },
  { type: 'BURGLARY' },
  { type: 'LARCENY/THEFT' },
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
  { type: 'DRUG/NARCOTIC' },
  { type: 'DISORDERLY CONDUCT' },
  { type: 'VAGRANCY' },
  { type: 'GAMBLING' },
  { type: 'DRUNK DRIVING VEHICLE / BOAT' },
  { type: 'VEHICLE THEFT' },
  { type: 'VANDALISM' },
  { type: 'WARRANTS' },
  { type: 'RECEIVING STOLEN PROPERTY' },
  { type: 'FEDERAL OFFENSES W/O MONEY' },
  { type: 'FEDERAL OFFENSES WITH MONEY' },
  { type: 'FELONIES MISCELLANEOUS' },
  { type: 'MISDEMEANORS MISCELLANEOUS' },
]);

// IMPORT DATA INTO STAGING TABLE
  // LA
const filePathLACounty = path.join(__dirname, '/csv/staging-la-county.csv');
const queryStringLACounty = `\COPY staging_la_counties (crime_date, crime_year, crime_category_number,
  crime_category_description, street, city, state, zip,
  latitude, longitude, reporting_district, crime_identifier, location)
  FROM '${filePathLACounty}' DELIMITER ',' CSV HEADER;`;
const dbinputLAdata = () => db.sequelize.query(queryStringLACounty);

// SF
const filePathSF = path.join(__dirname, '/csv/staging-sf.csv');
const queryStringSF = `\COPY staging_sfs (incident_num, category, date, time, address, x, y, location)
  FROM '${filePathSF}' DELIMITER ',' CSV HEADER;`;
const dbinputSFdata = () => db.sequelize.query(queryStringSF);

// CLEAN STAGING TABLE

// LA
const queryStringCleanUpLACounty = 'DELETE FROM staging_la_counties WHERE longitude IS null;';
const dbcleanLAdata = () => db.sequelize.query(queryStringCleanUpLACounty);


// IMPORT DATA INTO PRODUCTION LA TABLE

// LA
const queryStringFinalizeLACounty = `INSERT INTO crime_la_counties (crime_type, crime_time, longitude, latitude, crime_identifier, address)
  SELECT crime_category_number, crime_date, longitude, latitude, crime_identifier, location
  from staging_la_counties;`;
const dbtransformLAdata = () => db.sequelize.query(queryStringFinalizeLACounty);

// SF
const queryStringFinalizeSF = `INSERT INTO crime_sfs (crime_type, crime_time, longitude, latitude, crime_identifier, address)
  SELECT ct.id as crime_type, sf.date, sf.x, sf.y, sf.incident_num, sf.address
  FROM staging_sfs sf, crime_types ct
  WHERE sf.category = ct.type;`;
const dbtransformSFdata = () => db.sequelize.query(queryStringFinalizeSF);

// CLEAN PRODUCTION LA TABLE

// LA
const queryStringFilterLaCounty = 'DELETE FROM crime_la_counties WHERE latitude < -90 ::DECIMAL;';
const dbfilterLAdata = () => db.sequelize.query(queryStringFilterLaCounty);

// SF
const queryStringFilterSF = 'DELETE FROM crime_sfs WHERE crime_type IS null;';
const dbfilterSFdata = () => db.sequelize.query(queryStringFilterSF);

// SPATIALIZE LA TABLE

// LA
const queryStringTransformGeomLACounty = 'UPDATE crime_la_counties SET geometry = ST_Transform(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326), 2227);';
const dbSpacialLA = () => db.sequelize.query(queryStringTransformGeomLACounty);

// SF
const queryStringTransformGeomSF = 'UPDATE crime_sfs SET geometry = ST_Transform(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326), 2227);';
const dbSpacialSF = () => db.sequelize.query(queryStringTransformGeomSF);
/* ALTER TABLE QUERY END */

// CLOSE CONNECTION
const dbclose = () => db.sequelize.close();

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {console.log('line132'); resolve()}, 100, 'foo');
});


/*
Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
*/



// DB SYNC START
db.sequelize.sync({
  force: true,
})
  // .then(Promise.all([p1, p2, p3, dbcreatUser, dbcrimeType]))
  .then(function() {
    return Promise.all([p1, p2, p3, dbcreatUser(), dbcrimeType()])
  })
  .then(values => {
    console.log(values)
  })
  // .then(dbcreatUser)
  // .then(dbcrimeType)
  .then(dbinputSFdata)
  // .then(dbinputLAdata)
  // .then(dbcleanLAdata)
  // .then(dbtransformLAdata)
  // .then(dbfilterLAdata)
  // .then(dbtransformSFdata)
  // .then(dbfilterSFdata)
  // .then(dbSpacialLA)
  // .then(dbSpacialSF)
  .then(dbclose);
