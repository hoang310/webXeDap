// services/userService.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create (register)
exports.createUser = async (data) => {
  const { password, ...rest } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    ...rest,
    password: hashedPassword
  });

  return await user.save();
};

// Login
exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
      user: {
      _id: user._id,
      name: user.name,
      email: user.email
      },
      token
    };
};

// Get all
exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

// Get by ID
exports.getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

// Update
exports.updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await User.findByIdAndUpdate(id, data, {
    new: true
  }).select("-password");
};

// Delete
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};