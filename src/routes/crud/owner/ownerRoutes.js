const express = require("express");
const router = express.Router();
const ownerController = require("../../../controllers/crud/owner/ownerController");
const authenticateToken = require("../../../middlewares/authMiddleware");

router.get("/get-all-owners", authenticateToken, ownerController.getAllOwners);
router.get(
  "/get-owner-by-id/:id",
  authenticateToken,
  ownerController.getOwnerById
);
router.get(
  "/get-owner-by-token",
  authenticateToken,
  ownerController.getOwnerByToken
);
router.post("/create-owner", authenticateToken, ownerController.createOwner);
router.put("/update-owner/:id", authenticateToken, ownerController.updateOwner);
router.delete(
  "/delete-owner/:id",
  authenticateToken,
  ownerController.deleteOwner
);

module.exports = router;
