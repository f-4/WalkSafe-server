module.exports = function(sequelize, DataTypes) {
  const Crime_type = sequelize.define('crime_type', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: DataTypes.STRING,
  },{
    timestamps: false,
  });
  return Crime_type;
}
