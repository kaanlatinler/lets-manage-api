const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/payment/paymentController");

router.post("/subscribe", paymentController.subscribe);

module.exports = router;
