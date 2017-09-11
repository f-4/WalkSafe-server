module.exports = function StagingSfSchema(sequelize, DataTypes) {
  const StagingSf = sequelize.define('staging_sf', {
    incident_num: DataTypes.INTEGER,
    category: DataTypes.STRING,
    // date: DataTypes.DATEONLY,
    date: DataTypes.STRING,
    time: DataTypes.TIME,
    address: DataTypes.STRING,
    x: DataTypes.DECIMAL,
    y: DataTypes.DECIMAL,
    location: DataTypes.STRING,
  }, { timestamps: false });
  return StagingSf;
};
