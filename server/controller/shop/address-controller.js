const  Address  = require("../../models/Address");

// Add Address
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newAddress = await Address.create({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    res.status(201).json({ success: true, data: newAddress });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Fetch all addresses of a user
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User id is required!" });
    }

    const addresses = await Address.findAll({ where: { userId } });

    res.status(200).json({ success: true, data: addresses });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Edit Address
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    const address = await Address.findOne({ where: { id: addressId, userId } });

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    await address.update(formData);

    res.status(200).json({ success: true, data: address });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const deleted = await Address.destroy({ where: { id: addressId, userId } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
