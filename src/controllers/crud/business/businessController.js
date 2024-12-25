const { Businesses } = require("../../../models/index");

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Businesses.findAll();
    if (!businesses || businesses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No businesses found" });
    }
    res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a business by ID
exports.getBusinessById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Business ID is required" });
  }

  try {
    const business = await Businesses.findByPk(id);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }
    res.status(200).json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new business
exports.createBusiness = async (req, res) => {
  const { Name, Email, Phone, Address } = req.body;

  if (!Name || !Email || !Phone || !Address) {
    return res.status(400).json({
      success: false,
      message: "Name, Email, Phone, and Address are required",
    });
  }

  try {
    const newBusiness = await Businesses.create({
      Name,
      Email,
      Phone,
      Address,
    });
    res.status(201).json({ success: true, data: newBusiness });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a business by ID
exports.updateBusiness = async (req, res) => {
  const { id } = req.params;
  const { Name, Email, Phone, Address } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Business ID is required" });
  }

  if (!Name && !Email && !Phone && !Address) {
    return res.status(400).json({
      success: false,
      message: "At least one field (Name, Email, Phone, Address) is required",
    });
  }

  try {
    const business = await Businesses.findByPk(id);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    // Sadece verilen alanları güncelle
    if (Name) business.Name = Name;
    if (Email) business.Email = Email;
    if (Phone) business.Phone = Phone;
    if (Address) business.Address = Address;

    await business.save();
    res.status(200).json({ success: true, data: business });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a business by ID
exports.deleteBusiness = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Business ID is required" });
  }

  try {
    const business = await Businesses.findByPk(id);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }
    await business.destroy();
    res
      .status(200)
      .json({ success: true, message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get business count
exports.getBusinessCount = async (req, res) => {
  try {
    const count = await Businesses.count();
    if (count === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No businesses found" });
    }
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
