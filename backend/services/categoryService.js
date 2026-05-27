
const Category = require("../models/Category");

exports.createCategory = async (data) => {
  const category = new Category(data);
  return await category.save();
};

exports.getAllCategories = async () => {
  return await Category.find().sort({ name: 1 }); 
};

exports.getCategoryById = async (id) => {
  return await Category.findById(id);
};

exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, {
    returnDocument: 'after'
  });
};

exports.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};