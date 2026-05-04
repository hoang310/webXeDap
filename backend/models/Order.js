// models/Order.js
const mongoose = require("mongoose");
require("./User");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  total_price: Number,
  status: String,
  payment_method: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);