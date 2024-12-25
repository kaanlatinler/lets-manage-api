const express = require("express");
const router = express.Router();
const genderController = require("../../../controllers/crud/gender/genderController");
const authenticateToken = require("../../../middlewares/authMiddleware");

router.get(
  "/get-all-genders",
  authenticateToken,
  genderController.getAllGenders
);
router.get(
  "/get-gender-by-id/:id",
  authenticateToken,
  genderController.getGenderById
);
router.post("/create-gender", authenticateToken, genderController.createGender);
router.put("/update-gender", authenticateToken, genderController.updateGender);
router.delete(
  "/delete-gender/:id",
  authenticateToken,
  genderController.deleteGender
);

module.exports = router;
