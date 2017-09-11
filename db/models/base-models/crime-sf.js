module.exports = function CrimeSfSchema(sequelize, DataTypes) {
  const CrimeSf = sequelize.define('crime_sf', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    crime_type: DataTypes.INTEGER,
    crime_time: DataTypes.STRING,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL,
    crime_identifier: DataTypes.INTEGER,
    address: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY, // postGIS column.  Possibly add 'srid' here
  }, {
    timestamps: false,
  });
  return CrimeSf;
};
