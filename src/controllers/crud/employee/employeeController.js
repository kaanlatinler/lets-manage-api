const { Employees } = require("../../../models/index");

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.findAll();
    if (!employees || employees.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No employees found" });
    }
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Employee ID is required" });
  }

  try {
    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  const {
    Name,
    LastName,
    Phone,
    Email,
    Password,
    Point,
    GenderId,
    RoleId,
    BusinessId,
  } = req.body;

  if (!Name || !LastName || !Phone || !Email || !Password) {
    return res.status(400).json({
      success: false,
      message: "Name, LastName, Phone, Email, and Password are required",
    });
  }

  try {
    const newEmployee = await Employees.create({
      Name,
      LastName,
      Phone,
      Email,
      Password,
      Point,
      GenderId,
      RoleId,
      BusinessId,
    });
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { Name, LastName, Phone, Email, Password, Point, GenderId, RoleId } =
    req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Employee ID is required" });
  }

  if (!Name && !LastName && !Phone && !Email && !Password && !Point) {
    return res.status(400).json({
      success: false,
      message:
        "At least one field (Name, LastName, Phone, Email, Password, Point) is required",
    });
  }

  try {
    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Sadece gönderilen alanları güncelle
    if (Name) employee.Name = Name;
    if (LastName) employee.LastName = LastName;
    if (Phone) employee.Phone = Phone;
    if (Email) employee.Email = Email;
    if (Password) employee.Password = Password;
    if (Point) employee.Point = Point;
    if (GenderId) employee.GenderId = GenderId;
    if (RoleId) employee.RoleId = RoleId;

    await employee.save();
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Employee ID is required" });
  }

  try {
    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    await employee.destroy();
    res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get employee count
exports.getEmployeeCount = async (req, res) => {
  try {
    const count = await Employees.count();
    if (count === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No employees found" });
    }
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
