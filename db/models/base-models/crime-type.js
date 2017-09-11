module.exports = function CrimeTypeSchema(sequelize, DataTypes) {
  const CrimeType = sequelize.define('crime_type', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return CrimeType;
};
