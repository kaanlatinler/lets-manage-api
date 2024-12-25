const express = require("express");
const router = express.Router();
const businessController = require("../../../controllers/crud/business/businessController");
const authenticateToken = require("../../../middlewares/authMiddleware");

router.get(
  "/get-all-businesses",
  authenticateToken,
  businessController.getAllBusinesses
);
router.get(
  "/get-business-by-id/:id",
  authenticateToken,
  businessController.getBusinessById
);
router.get(
  "/get-business-count",
  authenticateToken,
  businessController.getBusinessCount
);
router.post(
  "/create-business",
  authenticateToken,
  businessController.createBusiness
);
router.put(
  "/update-business/:id",
  authenticateToken,
  businessController.updateBusiness
);
router.delete(
  "/delete-business/:id",
  authenticateToken,
  businessController.deleteBusiness
);

module.exports = router;
