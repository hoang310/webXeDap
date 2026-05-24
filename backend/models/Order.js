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

  payment: {
    method: {
      type: String,
      enum: ["cod", "banking"]
    },

    status: {
      type: String,
      default: "unpaid"
    }
  },

  shipment: {
    address: String,

    status: {
      type: String,
      default: "preparing"
    },

    shipped_at: Date
  },
  
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);