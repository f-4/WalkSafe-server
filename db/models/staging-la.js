module.exports = function(sequelize, DataTypes) {
  const staging_la = sequelize.define('staging_la', {
    lurn_sak: DataTypes.INTEGER,
    incident_date: DataTypes.DATE,
    stat: DataTypes.STRING,
    stat_desc: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    xy_point:DataTypes.STRING,
    incident_id:DataTypes.STRING,
    reporting_district:DataTypes.INTEGER,
    seq:DataTypes.INTEGER,
    unit_id:DataTypes.STRING,
    unit_name:DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,

  });
  return staging_la;
}

