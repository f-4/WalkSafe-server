module.exports = function(sequelize, DataTypes) {
  const Staging_sf = sequelize.define('staging_sf', {
    incident_num: DataTypes.INTEGER,
    category: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    address: DataTypes.STRING,
    x: DataTypes.DECIMAL,
    y: DataTypes.DECIMAL,
    location: DataTypes.STRING,
  }, { timestamps: false });
  return Staging_sf;
}

