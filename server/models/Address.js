const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const User = require("./User");

const Address = sequelize.define("Address", {
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  pincode: DataTypes.STRING,
  phone: DataTypes.STRING,
  notes: DataTypes.STRING,
});

User.hasMany(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

module.exports = Address;
