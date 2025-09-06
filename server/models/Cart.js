const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {});

const CartItem = sequelize.define("CartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// Associations
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, { through: CartItem, foreignKey: "cartId" });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: "productId" });

module.exports = { Cart, CartItem };
