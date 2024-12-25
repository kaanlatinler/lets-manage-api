const express = require("express");
const router = express.Router();
const employeeController = require("../../../controllers/crud/employee/employeeController");
const authenticateToken = require("../../../middlewares/authMiddleware");

router.get(
  "/get-all-employees",
  authenticateToken,
  employeeController.getAllEmployees
);
router.get(
  "/get-employee-by-id/:id",
  authenticateToken,
  employeeController.getEmployeeById
);

router.get(
  "/get-employee-count",
  authenticateToken,
  employeeController.getEmployeeCount
);
router.post(
  "/create-employee",
  authenticateToken,
  employeeController.createEmployee
);
router.put(
  "/update-employee/:id",
  authenticateToken,
  employeeController.updateEmployee
);
router.delete(
  "/delete-employee/:id",
  authenticateToken,
  employeeController.deleteEmployee
);

module.exports = router;
