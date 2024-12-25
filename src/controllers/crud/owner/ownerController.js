const { businessOwners } = require("../../../models/index");

// Get all business owners
exports.getAllOwners = async (req, res) => {
  try {
    const owners = await businessOwners.findAll();
    if (!owners || owners.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No business owners found" });
    }
    res.status(200).json({ success: true, data: owners });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a business owner by ID
exports.getOwnerById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Owner ID is required" });
  }

  try {
    const owner = await businessOwners.findByPk(id);
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Business Owner not found" });
    }
    res.status(200).json({ success: true, data: owner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a business owner by Token
exports.getOwnerByToken = async (req, res) => {
  try {
    const owner = req.user;

    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Business Owner not found" });
    }

    res.status(200).json({ success: true, data: owner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new business owner
exports.createOwner = async (req, res) => {
  const { Name, LastName, Phone, Email, Password } = req.body;

  if (!Name || !LastName || !Phone || !Email || !Password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newOwner = await businessOwners.create({
      Name,
      LastName,
      Phone,
      Email,
      Password,
    });
    res.status(201).json({ success: true, data: newOwner });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a business owner by ID
exports.updateOwner = async (req, res) => {
  const { id } = req.params;
  const { Name, LastName, Phone, Email, Password } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Owner ID is required" });
  }

  if (!Name && !LastName && !Phone && !Email && !Password) {
    return res
      .status(400)
      .json({ success: false, message: "No fields to update provided" });
  }

  try {
    const owner = await businessOwners.findByPk(id);
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Business Owner not found" });
    }

    // Update only provided fields
    if (Name) owner.Name = Name;
    if (LastName) owner.LastName = LastName;
    if (Phone) owner.Phone = Phone;
    if (Email) owner.Email = Email;
    if (Password) owner.Password = Password;

    await owner.save();
    res.status(200).json({ success: true, data: owner });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a business owner by ID
exports.deleteOwner = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Owner ID is required" });
  }

  try {
    const owner = await businessOwners.findByPk(id);
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Business Owner not found" });
    }

    await owner.destroy();
    res
      .status(200)
      .json({ success: true, message: "Business Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
