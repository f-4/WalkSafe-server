module.exports = function UserSchema(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    access_token: DataTypes.STRING,
  });

  User.associate = function UserAssociate(models) {
    User.hasMany(models.contact);
  };
  return User;
};
