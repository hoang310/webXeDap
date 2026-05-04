// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);