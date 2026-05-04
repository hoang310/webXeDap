// controllers/reviewController.js

const reviewService = require("../services/reviewService");

// Create
exports.createReview = async (req, res) => {
  try {
    const data = await reviewService.createReview(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Create review failed" });
  }
};

// Get all
exports.getAllReviews = async (req, res) => {
  try {
    const data = await reviewService.getAllReviews();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get reviews failed" });
  }
};

// Get by product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const data = await reviewService.getReviewsByProduct(req.params.productId);
    res.json(data);
  } catch (err) {
    console.log(req.params.productId)
    res.status(500).json({ message: "Get reviews by product failed" });
  }
};

// Get by user
exports.getReviewsByUser = async (req, res) => {
  try {
    const data = await reviewService.getReviewsByUser(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get reviews by user failed" });
  }
};

// Get by ID
exports.getReviewById = async (req, res) => {
  try {
    const data = await reviewService.getReviewById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Get review failed" });
  }
};

// Update
exports.updateReview = async (req, res) => {
  try {
    const data = await reviewService.updateReview(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Update review failed" });
  }
};

// Delete
exports.deleteReview = async (req, res) => {
  try {
    const data = await reviewService.deleteReview(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Delete review failed" });
  }
};