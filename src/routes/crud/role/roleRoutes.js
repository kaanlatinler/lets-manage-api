const express = require("express");
const router = express.Router();
const roleController = require("../../../controllers/crud/role/roleController");
const authenticateToken = require("../../../middlewares/authMiddleware");

router.get("/get-all-roles", authenticateToken, roleController.getAllRoles);
router.get(
  "/get-role-by-id/:id",
  authenticateToken,
  roleController.getRoleById
);
router.post("/create-role", authenticateToken, roleController.createRole);
router.put("/update-role/:id", authenticateToken, roleController.updateRole);
router.delete("/delete-role/:id", authenticateToken, roleController.deleteRole);

module.exports = router;
