const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer in-memory storage (buffer-based)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Utility function to upload buffer to Cloudinary
async function imageUploadUtil(fileBuffer) {
  try {
    const result = await cloudinary.uploader.upload_stream({
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}

module.exports = { upload, imageUploadUtil, cloudinary };
