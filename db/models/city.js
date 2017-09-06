module.exports = function(sequelize, DataTypes) {
  const city = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    city_name: DataTypes.STRING
  });
  return city;
}
