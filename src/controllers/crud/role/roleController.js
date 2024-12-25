const { Roles } = require("../../../models/index");

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    if (!roles || roles.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No roles found" });
    }
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a role by ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Role ID is required" });
  }

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a role
exports.createRole = async (req, res) => {
  const { Name } = req.body;

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Role name is required" });
  }

  try {
    const newRole = await Roles.create({ Name });
    res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a role by ID
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Role ID is required" });
  }

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Role name is required" });
  }

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    role.Name = Name;
    await role.save();
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Role ID is required" });
  }

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    await role.destroy();
    res
      .status(200)
      .json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
