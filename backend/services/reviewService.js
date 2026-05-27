
const Review = require("../models/Review");

exports.createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

exports.getAllReviews = async () => {
  return await Review.find()
    .populate("user_id", "name")
    .populate("product_id", "name");
};

exports.getReviewsByProduct = async (productId) => {
  return await Review.find({ product_id: productId })
    .populate("user_id", "name")
    .sort({ createdAt: -1 });
};

exports.getReviewsByUser = async (userId) => {
  return await Review.find({ user_id: userId })
    .populate("product_id", "name")
    .sort({ createdAt: -1 });
};

exports.getReviewById = async (id) => {
  return await Review.findById(id)
    .populate("user_id", "name")
    .populate("product_id", "name");
};

exports.updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, {
    returnDocument: 'after'
  });
};

exports.deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};