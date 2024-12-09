const express = require("express");
const router = express.Router();
const managerController = require("../../controllers/manager/managerController");
const authenticateToken = require("../../middlewares/authMiddleware");

router.get(
  "/getManagerDetails",
  authenticateToken,
  managerController.GetManagerDetails
);

module.exports = router;
