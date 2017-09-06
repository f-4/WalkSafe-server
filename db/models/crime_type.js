module.exports = function(sequelize, DataTypes) {
  const crime_type = sequelize.define('crimetype', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: DataTypes.STRING,
  });
  return crime_type;
}
