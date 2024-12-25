const { OrderDetails } = require("../../models");

// Get all order details
exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetails.findAll();
    if (!orderDetails || orderDetails.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No order details found" });
    }
    res.status(200).json({ success: true, data: orderDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get an order detail by ID
exports.getOrderDetailById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order detail ID is required" });
  }

  try {
    const orderDetail = await OrderDetails.findByPk(id);
    if (!orderDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Order detail not found" });
    }
    res.status(200).json({ success: true, data: orderDetail });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new order detail
exports.createOrderDetail = async (req, res) => {
  const { OrderId, ProductId, Quantity, Price, TotalPrice } = req.body;

  if (!OrderId || !ProductId || !Quantity || !Price || !TotalPrice) {
    return res.status(400).json({
      success: false,
      message:
        "Order ID, Product ID, Quantity, Total Price and Price are required",
    });
  }

  try {
    const newOrderDetail = await OrderDetails.create({
      OrderId,
      ProductId,
      Quantity,
      Price,
      TotalPrice,
    });
    res.status(201).json({ success: true, data: newOrderDetail });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update an order detail by ID
exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  const { OrderId, ProductId, Quantity, Price, TotalPrice } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order detail ID is required" });
  }

  try {
    const orderDetail = await OrderDetails.findByPk(id);
    if (!orderDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Order detail not found" });
    }

    await OrderDetails.update(
      { OrderId, ProductId, Quantity, Price, TotalPrice },
      { where: { id } }
    );

    res.status(200).json({ success: true, message: "Order detail updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete an order detail
exports.deleteOrderDetail = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order detail ID is required" });
  }

  try {
    const orderDetail = await OrderDetails.findByPk(id);
    if (!orderDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Order detail not found" });
    }

    await OrderDetails.destroy({ where: { id } });
    res.status(200).json({ success: true, message: "Order detail deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
