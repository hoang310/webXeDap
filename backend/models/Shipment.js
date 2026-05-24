// models/Shipment.js
const mongoose = require("mongoose");
require("./Order");

const shipmentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  address: String,
  status: String,
  shipped_at: Date
});

module.exports = mongoose.model("Shipment", shipmentSchema);