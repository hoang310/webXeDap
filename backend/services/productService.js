// services/productService.js

const Product = require("../models/Product");

// Create
exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Get all (with filter, search, pagination + join category)
exports.getAllProducts = async (query) => {
  const {
    page = 1,
    limit = 10,
    keyword,
    category,
    minPrice,
    maxPrice,
    sortBy = "createdAt",
    order = "desc"
  } = query;

  const filter = {};

  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }

  if (category) {
    filter.category_id = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .populate("category_id", "name")
    .sort({ [sortBy]: order === "desc" ? -1 : 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  //console.log("keyword: ", keyword);
  //console.log("category: ", category);

  return {
    data: products,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit)
  };
};

// Get by ID (join category)
exports.getProductById = async (id) => {
  return await Product.findById(id)
    .populate("category_id", "name");
};

// Update
exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true
  }).populate("category_id", "name");
};

// Delete
exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

// Featured (join category)
exports.getFeatured = async () => {
  return await Product.find({ featured: true })
    .populate("category_id", "name")
    .limit(8);
};

// Newest (join category)
exports.getNewest = async () => {
  return await Product.find()
    .populate("category_id", "name")
    .sort({ createdAt: -1 })
    .limit(8);
};

// Best seller (join category)
exports.getBestSeller = async () => {
  return await Product.find()
    .populate("category_id", "name")
    .sort({ sold: -1 })
    .limit(8);
};

// Aggregate join (lookup)
exports.getProductsWithCategoryAgg = async () => {
  return await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category"
      }
    },
    {
      $unwind: "$category"
    },
    {
      $project: {
        name: 1,
        price: 1,
        "category._id": 1,
        "category.name": 1
      }
    }
  ]);
};