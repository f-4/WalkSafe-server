module.exports = function CitySchema(sequelize, DataTypes) {
  const City = sequelize.define('city', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    city_name: DataTypes.STRING,
  });
  return City;
};
