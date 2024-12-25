const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");
const authenticateToken = require("../../middlewares/authMiddleware");

router.post("/owner-login", authController.BOLogin);
router.post("/owner-register", authenticateToken, authController.BORegister);

module.exports = router;
