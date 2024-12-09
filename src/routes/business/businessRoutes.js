const express = require("express");
const router = express.Router();
const businessController = require("../../controllers/business/businessController");
const authenticateToken = require("../../middlewares/authMiddleware");

router.get(
  "/getBusinessDetails/:BusinessName",
  authenticateToken,
  businessController.GetBusinessDetails
);
router.post(
  "/createBusiness",
  authenticateToken,
  businessController.CreateBusiness
);
router.put(
  "/updateBusiness/:BusinessName",
  authenticateToken,
  businessController.UpdateBusiness
);
router.delete(
  "/deleteBusiness/:BusinessName",
  authenticateToken,
  businessController.DeleteBusiness
);

router.get(
  "/getBusinesses",
  authenticateToken,
  businessController.GetBusinesses
);

module.exports = router;
