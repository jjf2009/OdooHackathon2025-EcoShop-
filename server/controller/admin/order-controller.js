const Order  = require("../../models/Order"); // Sequelize models

// Get all orders
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.findAll();

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found!" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

// Get single order
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

module.exports = { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus };
