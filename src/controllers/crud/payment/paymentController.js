const { Payments } = require("../../models");

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll();
    if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No payments found" });
    }
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Payment ID is required" });
  }

  try {
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a payment
exports.createPayment = async (req, res) => {
  const { Date, Time, Method, OrderId, EmployeeId, BusinessId } = req.body;

  if (!Date || !Time || !Method || !OrderId || !EmployeeId || !BusinessId) {
    return res.status(400).json({
      success: false,
      message:
        "Date, Time, Method, OrderId, EmployeeId, and BusinessId are required",
    });
  }

  try {
    const newPayment = await Payments.create({
      Date,
      Time,
      Method,
      OrderId,
      EmployeeId,
      BusinessId,
    });
    res.status(201).json({ success: true, data: newPayment });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { Date, Time, Method, OrderId, EmployeeId, BusinessId } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Payment ID is required" });
  }

  try {
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    await Payments.update(
      { Date, Time, Method, OrderId, EmployeeId, BusinessId },
      { where: { Id: id } }
    );

    res.status(200).json({ success: true, message: "Payment updated" });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Payment ID is required" });
  }

  try {
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    await Payments.destroy({ where: { Id: id } });

    res.status(200).json({ success: true, message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
