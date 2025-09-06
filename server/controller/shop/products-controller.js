const { Op } = require("sequelize");
const { Product } = require("../../models/Product");

// Filtered products with category, brand & sorting
const getFilteredProducts = async (req, res) => {
  try {
    const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category) {
      filters.category = { [Op.in]: category.split(",") };
    }

    if (brand) {
      filters.brand = { [Op.in]: brand.split(",") };
    }

    let order = [];
    switch (sortBy) {
      case "price-lowtohigh":
        order = [["price", "ASC"]];
        break;
      case "price-hightolow":
        order = [["price", "DESC"]];
        break;
      case "title-atoz":
        order = [["title", "ASC"]];
        break;
      case "title-ztoa":
        order = [["title", "DESC"]];
        break;
      default:
        order = [["price", "ASC"]];
    }

    const products = await Product.findAll({
      where: filters,
      order,
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Get details of a single product
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
