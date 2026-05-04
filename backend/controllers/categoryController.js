// controllers/categoryController.js

const categoryService = require("../services/categoryService");

// Create
exports.createCategory = async (req, res) => {
  try {
    const data = await categoryService.createCategory(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Create failed" });
  }
};

// Get all
exports.getAllCategories = async (req, res) => {
  try {
    const data = await categoryService.getAllCategories();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get failed" });
  }
};

// Get by ID
exports.getCategoryById = async (req, res) => {
  try {
    const data = await categoryService.getCategoryById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get failed" });
  }
};

// Update
exports.updateCategory = async (req, res) => {
  try {
    const data = await categoryService.updateCategory(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete
exports.deleteCategory = async (req, res) => {
  try {
    const data = await categoryService.deleteCategory(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};