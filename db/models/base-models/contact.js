module.exports = function ContactSchema(sequelize, DataTypes) {
  const Contact = sequelize.define('contact', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    contact_name: DataTypes.STRING,
    phone_number: DataTypes.DOUBLE,
  });

  Contact.associate = function ContactAssociate(models) {
    Contact.belongsTo(models.user);
  };
  return Contact;
};
