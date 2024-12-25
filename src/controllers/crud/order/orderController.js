const { Orders } = require("../../../models/index");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order ID is required" });
  }

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { Date, Time, TotalAmount, StatusId, TableId, EmployeeId, BusinessId } =
    req.body;

  if (!OrderStatusId || !TableId || !EmployeeId) {
    return res.status(400).json({
      success: false,
      message:
        "Order Status ID, Table ID, Business ID, Date, Time and Employee ID are required",
    });
  }

  try {
    const newOrder = await Orders.create({
      Date,
      Time,
      TotalAmount,
      StatusId,
      TableId,
      EmployeeId,
      BusinessId,
    });
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { Date, Time, TotalAmount, StatusId, TableId, EmployeeId, BusinessId } =
    req.body;

  if (
    !id ||
    !Date ||
    !Time ||
    !TotalAmount ||
    !StatusId ||
    !TableId ||
    !EmployeeId ||
    !BusinessId
  ) {
    return res.status(400).json({
      success: false,
      message:
        "ID, Date, Time, TotalAmount, StatusId, TableId, EmployeeId, BusinessId are required",
    });
  }

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.Date = Date;
    order.Time = Time;
    order.TotalAmount = TotalAmount;
    order.StatusId = StatusId;
    order.TableId = TableId;
    order.EmployeeId = EmployeeId;
    order.BusinessId = BusinessId;

    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Order ID is required" });
  }

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.destroy();
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
