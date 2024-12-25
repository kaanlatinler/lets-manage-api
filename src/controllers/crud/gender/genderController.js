const { Genders } = require("../../../models/index");

// Get all Genders
exports.getAllGenders = async (req, res) => {
  try {
    const genders = await Genders.findAll();
    if (!genders || genders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No genders found" });
    }
    res.status(200).json({ success: true, data: genders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get Gender by ID
exports.getGenderById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Gender ID is required" });
  }

  try {
    const gender = await Genders.findByPk(id);
    if (!gender) {
      return res
        .status(404)
        .json({ success: false, message: "Gender not found" });
    }
    res.status(200).json({ success: true, data: gender });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a gender
exports.createGender = async (req, res) => {
  const { Name } = req.body;

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const newGender = await Genders.create({ Name });
    res.status(201).json({ success: true, data: newGender });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a gender by ID
exports.updateGender = async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Gender ID is required" });
  }

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const gender = await Genders.findByPk(id);
    if (!gender) {
      return res
        .status(404)
        .json({ success: false, message: "Gender not found" });
    }

    gender.Name = Name;
    await gender.save();
    res.status(200).json({ success: true, data: gender });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a gender
exports.deleteGender = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Gender ID is required" });
  }

  try {
    const gender = await Genders.findByPk(id);
    if (!gender) {
      return res
        .status(404)
        .json({ success: false, message: "Gender not found" });
    }

    await gender.destroy();
    res.status(200).json({ success: true, message: "Gender deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
