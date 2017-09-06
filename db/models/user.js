module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    access_token: DataTypes.STRING
  });

  user.associate = function(models) {
    user.hasMany(models.contact);
  }
  return user;
}
