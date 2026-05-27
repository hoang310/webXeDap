
const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  try {
    const data = await orderService.createOrder(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Create order failed" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const data = await orderService.getAllOrders(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get orders failed" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const data = await orderService.getOrderById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found: " + req.params.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get order failed" });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersByUser(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get user orders failed" });
  }
};

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

exports.deleteOrder = async (req, res) => {
  try {
    const data = await orderService.deleteOrder(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Delete order failed" });
  }
};