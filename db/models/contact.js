module.exports = function(sequelize, DataTypes) {
  const contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    contact_name: DataTypes.STRING,
    phone_number: DataTypes.DOUBLE,
  }, {
    classMethods: {
      associate: function(models) {
        contact.belongsTo(models.user, {
          foreignKey: 'user_id',
          as: 'user'
        });
      }
    }
  });
  return contact;
}
