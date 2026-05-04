// controllers/orderController.js

const orderService = require("../services/orderService");

// Create
exports.createOrder = async (req, res) => {
  try {
    const data = await orderService.createOrder(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Create order failed" });
  }
};

// Get all
exports.getAllOrders = async (req, res) => {
  try {
    const data = await orderService.getAllOrders();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get orders failed" });
  }
};

// Get by ID
exports.getOrderById = async (req, res) => {
  try {
    const data = await orderService.getOrderById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found: " + req.params.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get order failed" });
  }
};

// Get by user
exports.getOrdersByUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersByUser(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get user orders failed" });
  }
};

// Update status
exports.updateOrderStatus = async (req, res) => {
  try {
    const data = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Update status failed" });
  }
};

// Delete
exports.deleteOrder = async (req, res) => {
  try {
    const data = await orderService.deleteOrder(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Delete order failed" });
  }
};