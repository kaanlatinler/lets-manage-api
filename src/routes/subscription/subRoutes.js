const express = require("express");
const router = express.Router();
const subController = require("../../controllers/subscription/subController");
const authenticateToken = require("../../middlewares/authMiddleware");

router.post("/subscribe", subController.CreateSub);
router.get("/subscriptions", subController.GetSubs);
router.get("/subscription/:id", authenticateToken, subController.GetSub);

module.exports = router;
