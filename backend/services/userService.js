
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.createUser = async (data) => {
  const { password, ...rest } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    ...rest,
    password: hashedPassword
  });

  return await user.save();
};

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

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

exports.getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

exports.updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await User.findByIdAndUpdate(id, data, {
    returnDocument: 'after'
  }).select("-password");
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};