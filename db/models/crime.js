module.exports = function(sequelize, DataTypes) {
  const crime = sequelize.define('crime', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    crime_type: DataTypes.STRING,
    crime_time: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    geometry: DataTypes.GEOMETRY  //postGIS column.  Possibly add 'srid' here
  });
  return crime;
}
