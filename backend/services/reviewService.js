// services/reviewService.js

const Review = require("../models/Review");

// Create
exports.createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

// Get all reviews
exports.getAllReviews = async () => {
  return await Review.find()
    .populate("user_id", "name")
    .populate("product_id", "name");
};

// Get reviews by product
exports.getReviewsByProduct = async (productId) => {
  return await Review.find({ product_id: productId })
    .populate("user_id", "name")
    .sort({ createdAt: -1 });
};

// Get reviews by user
exports.getReviewsByUser = async (userId) => {
  return await Review.find({ user_id: userId })
    .populate("product_id", "name")
    .sort({ createdAt: -1 });
};

// Get by ID
exports.getReviewById = async (id) => {
  return await Review.findById(id)
    .populate("user_id", "name")
    .populate("product_id", "name");
};

// Update
exports.updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, {
    new: true
  });
};

// Delete
exports.deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};