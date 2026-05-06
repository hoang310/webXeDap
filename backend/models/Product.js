const mongoose = require("mongoose");
require("./Category");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  desc: {
    type: String,
    required: true
  },

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);