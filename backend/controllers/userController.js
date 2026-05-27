
const userService = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Register failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.login(email, password);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get users failed" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const data = await userService.getUserById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get user failed" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Update user failed" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Delete user failed" });
  }
};