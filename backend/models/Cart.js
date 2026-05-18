// models/Cart.js
const mongoose = require("mongoose");
require("./User");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", cartSchema);