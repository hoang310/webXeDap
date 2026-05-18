// services/categoryService.js

const Category = require("../models/Category");

// Create
exports.createCategory = async (data) => {
  const category = new Category(data);
  return await category.save();
};

// Get all
exports.getAllCategories = async () => {
  return await Category.find();
};

// Get by ID
exports.getCategoryById = async (id) => {
  return await Category.findById(id);
};

// Update
exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, {
    returnDocument: 'after'
  });
};

// Delete
exports.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};