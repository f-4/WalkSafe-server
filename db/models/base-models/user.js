module.exports = function UserSchema(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    google_id: DataTypes.STRING,
    google_token: DataTypes.STRING,
    avatar: DataTypes.STRING,
    access_token: DataTypes.STRING,
  });

  User.associate = function UserAssociate(models) {
    User.hasMany(models.contact);
  };
  return User;
};
