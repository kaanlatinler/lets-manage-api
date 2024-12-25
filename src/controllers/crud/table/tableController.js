const { Tables } = require("../../../models/index");

// Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Tables.findAll();
    if (!tables || tables.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tables found" });
    }
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a table by ID
exports.getTableById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Table ID is required" });
  }

  try {
    const table = await Tables.findByPk(id);
    if (!table) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }
    res.status(200).json({ success: true, data: table });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new table
exports.createTable = async (req, res) => {
  const { Name, TableCategoryId } = req.body;

  if (!Name || !TableCategoryId) {
    return res.status(400).json({
      success: false,
      message: "Name and Table Category ID are required",
    });
  }

  try {
    const newTable = await Tables.create({ Name, TableCategoryId });
    res.status(201).json({ success: true, data: newTable });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a table
exports.updateTable = async (req, res) => {
  const { id } = req.params;
  const { Name, CategoryId } = req.body;

  if (!id || !Name || !CategoryId) {
    return res.status(400).json({
      success: false,
      message: "ID, Name, and Table Category ID are required",
    });
  }

  try {
    const table = await Tables.findByPk(id);
    if (!table) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }

    table.Name = Name;
    table.CategoryId = CategoryId;
    await table.save();

    res.status(200).json({ success: true, data: table });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a table
exports.deleteTable = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Table ID is required" });
  }

  try {
    const table = await Tables.findByPk(id);
    if (!table) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }

    await table.destroy();
    res.status(200).json({ success: true, message: "Table deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
