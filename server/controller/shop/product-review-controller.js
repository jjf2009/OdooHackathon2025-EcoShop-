const  Review  = require("../../models/Review");
const { Order } = require("../../models/Order");
const  Product  = require("../../models/Product");


// Add a product review
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    const order = await Order.findOne({
      where: { userId },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this product to review it.",
      });
    }

    const existingReview = await Review.findOne({
      where: { productId, userId },
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = await Review.create({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    // update average rating
    const reviews = await Review.findAll({ where: { productId } });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, r) => sum + r.reviewValue, 0) / totalReviewsLength;

    await Product.update({ averageReview }, { where: { id: productId } });

    res.status(201).json({ success: true, data: newReview });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.findAll({ where: { productId } });

    res.status(200).json({ success: true, data: reviews });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { addProductReview, getProductReviews };
