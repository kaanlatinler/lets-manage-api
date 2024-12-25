const { TableCategories } = require("../../../models/index");

// Get all table categories
exports.getAllTableCategories = async (req, res) => {
  try {
    const tableCategories = await TableCategories.findAll();
    if (!tableCategories || tableCategories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No table categories found" });
    }
    res.status(200).json({ success: true, data: tableCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a table category by ID
exports.getTableCategoryById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Table category ID is required" });
  }

  try {
    const tableCategory = await TableCategories.findByPk(id);
    if (!tableCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Table category not found" });
    }
    res.status(200).json({ success: true, data: tableCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new table category
exports.createTableCategory = async (req, res) => {
  const { Name } = req.body;

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Table category name is required" });
  }

  try {
    const newTableCategory = await TableCategories.create({ Name });
    res.status(201).json({ success: true, data: newTableCategory });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a table category
exports.updateTableCategory = async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  if (!id || !Name) {
    return res
      .status(400)
      .json({ success: false, message: "ID and Name are required" });
  }

  try {
    const tableCategory = await TableCategories.findByPk(id);
    if (!tableCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Table category not found" });
    }

    tableCategory.Name = Name;
    await tableCategory.save();

    res.status(200).json({ success: true, data: tableCategory });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a table category
exports.deleteTableCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Table category ID is required" });
  }

  try {
    const tableCategory = await TableCategories.findByPk(id);
    if (!tableCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Table category not found" });
    }

    await tableCategory.destroy();
    res.status(200).json({ success: true, message: "Table category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
