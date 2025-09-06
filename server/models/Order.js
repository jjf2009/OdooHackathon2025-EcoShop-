const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const User = require("./User");
const Address = require("./Address");

const Order = sequelize.define("Order", {
  orderStatus: DataTypes.STRING,
  paymentMethod: DataTypes.STRING,
  paymentStatus: DataTypes.STRING,
  totalAmount: DataTypes.FLOAT,
  orderDate: DataTypes.DATE,
  orderUpdateDate: DataTypes.DATE,
  paymentId: DataTypes.STRING,
  payerId: DataTypes.STRING,
});

// Order has many items (embedded details from cart)
const OrderItem = sequelize.define("OrderItem", {
  title: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.FLOAT,
  quantity: DataTypes.INTEGER,
});

// Relations
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Address.hasMany(Order, { foreignKey: "addressId" });
Order.belongsTo(Address, { foreignKey: "addressId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

module.exports = { Order, OrderItem };
