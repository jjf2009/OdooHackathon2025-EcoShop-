const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Feature = sequelize.define("Feature", {
  image: DataTypes.STRING,
});

module.exports = Feature;
