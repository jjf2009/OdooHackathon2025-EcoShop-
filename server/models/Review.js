const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const User = require("./User");
const Product = require("./Product");

const Review = sequelize.define("Review", {
  userName: DataTypes.STRING,
  reviewMessage: DataTypes.TEXT,
  reviewValue: DataTypes.INTEGER,
});

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Review, { foreignKey: "productId" });
Review.belongsTo(Product, { foreignKey: "productId" });

module.exports = Review;
