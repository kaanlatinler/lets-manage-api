const { OrderStatus } = require("../../../models/index");

// Get all order statuses
exports.getAllOrderStatuses = async (req, res) => {
  try {
    const orderStatuses = await OrderStatus.findAll();
    if (!orderStatuses || orderStatuses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No order statuses found" });
    }
    res.status(200).json({ success: true, data: orderStatuses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get an order status by ID
exports.getOrderStatusById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order status ID is required" });
  }

  try {
    const orderStatus = await OrderStatus.findByPk(id);
    if (!orderStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Order status not found" });
    }
    res.status(200).json({ success: true, data: orderStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new order status
exports.createOrderStatus = async (req, res) => {
  const { Name } = req.body;

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Order status name is required" });
  }

  try {
    const newOrderStatus = await OrderStatus.create({ Name });
    res.status(201).json({ success: true, data: newOrderStatus });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update an order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order status ID is required" });
  }

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Order status name is required" });
  }

  try {
    const orderStatus = await OrderStatus.findByPk(id);
    if (!orderStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Order status not found" });
    }

    orderStatus.Name = Name;
    await orderStatus.save();

    res.status(200).json({ success: true, data: orderStatus });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete an order status
exports.deleteOrderStatus = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order status ID is required" });
  }

  try {
    const orderStatus = await OrderStatus.findByPk(id);
    if (!orderStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Order status not found" });
    }

    await orderStatus.destroy();
    res.status(200).json({ success: true, message: "Order status deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
