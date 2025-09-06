const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Product = sequelize.define("Product", {
  image: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  brand: DataTypes.STRING,
  price: DataTypes.FLOAT,
  salePrice: DataTypes.FLOAT,
  totalStock: DataTypes.INTEGER,
  averageReview: DataTypes.FLOAT,
});

module.exports = Product;
