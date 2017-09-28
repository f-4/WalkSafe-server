module.exports = function MarkerSchema(sequelize, DataTypes) {
  const Marker = sequelize.define('marker', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
  });

  Marker.associate = function ContactAssociate(models) {
    Marker.belongsTo(models.user);
  };
  return Marker;
};
