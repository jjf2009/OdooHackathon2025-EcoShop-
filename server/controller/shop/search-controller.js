const { Op } = require("sequelize");
const  Product  = require("../../models/Product");

// Search products by keyword
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be a string",
      });
    }

    const searchResults = await Product.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
          { category: { [Op.iLike]: `%${keyword}%` } },
          { brand: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
    });

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { searchProducts };
