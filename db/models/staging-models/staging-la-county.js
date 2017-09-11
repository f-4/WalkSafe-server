module.exports = function StagingLaCountySchema(sequelize, DataTypes) {
  const StagingLaCounty = sequelize.define('staging_la_county', {
    // crime_date: DataTypes.DATE,
    crime_date: DataTypes.STRING,
    crime_year: DataTypes.INTEGER,
    crime_category_number: DataTypes.INTEGER,
    crime_category_description: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    reporting_district: DataTypes.INTEGER,
    crime_identifier: DataTypes.INTEGER,
    location: DataTypes.STRING,
  }, { timestamps: false });
  return StagingLaCounty;
};


/*
createdAt: {
  type: DataTypes.DATE,
  field: 'beginTime',
  defaultValue: sequelize.literal('NOW()'),
},
updatedAt: {
  type: DataTypes.DATE,
  defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
},
*/
