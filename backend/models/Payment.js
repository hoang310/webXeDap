// models/Payment.js
const mongoose = require("mongoose");
require("./Order");

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  method: String,
  status: String,
  transaction_id: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);