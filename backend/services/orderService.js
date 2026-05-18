// services/orderService.js

const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

// Create order + items
exports.createOrder = async (data) => {
  const { items, ...orderData } = data;

  const order = new Order(orderData);
  const savedOrder = await order.save();

  const orderItems = items.map((item) => ({
    order_id: savedOrder._id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }));

  await OrderItem.insertMany(orderItems);

  return savedOrder;
};

// Get all orders (with items)
exports.getAllOrders = async (query) => {

  const {page = 1, limit = 5} = query;

  const skip = (page - 1) * limit;

  const total = await Order.countDocuments();

  const orders = await Order.find().populate("user_id", "name email").skip(skip).limit(Number(limit));

  const results = [];

  for (let order of orders) {
    const items = await OrderItem.find({ order_id: order._id })
      .populate("product_id", "name price");

    results.push({
      ...order.toObject(),
      items
    });
  }

  return {data: results,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit)
  };
};

// Get order by ID
exports.getOrderById = async (id = "69c3f29216b6cee7372b6bff") => {
  const order = await Order.findById(id)
    .populate("user_id", "name email");

  if (!order) return null;

  const items = await OrderItem.find({ order_id: id })
    .populate("product_id", "name price");

  return {
    ...order.toObject(),
    items
  };
};

// Get orders by user
exports.getOrdersByUser = async (userId) => {
  const orders = await Order.find({ user_id: userId })
    .sort({ createdAt: -1 });

  const results = [];

  for (let order of orders) {
    const items = await OrderItem.find({ order_id: order._id })
      .populate("product_id", "name price");

    results.push({
      ...order.toObject(),
      items
    });
  }

  return results;
};

// Update status
exports.updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: 'after' }
  );
};

// Delete order + items 
exports.deleteOrder = async (id) => {
  await OrderItem.deleteMany({ order_id: id });
  return await Order.findByIdAndDelete(id);
};