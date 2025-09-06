const  Feature  = require("../../models/Feature"); // Sequelize models

// Add a feature image
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImage = await Feature.create({ image });

    res.status(201).json({
      success: true,
      data: featureImage,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get all feature images
const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.findAll();

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages };
