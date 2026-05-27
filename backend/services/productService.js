
const Product = require("../models/Product");


exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

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

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const products = await Product.find(filter)
    .populate("category_id", "name")
    .sort({ createdAt: -1, _id: -1 })
    .skip(skip)
    .limit(limitNumber);

  const total = await Product.countDocuments(filter);

  return {
    data: products,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit)
  };
};


exports.getProductById = async (id) => {
  return await Product.findById(id)
    .populate("category_id", "name");
};

exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    returnDocument: 'after'
  }).populate("category_id", "name");
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

exports.getFeatured = async () => {
  return await Product.find({ featured: true })
    .populate("category_id", "name")
    .limit(8);
};

exports.getNewest = async () => {
  return await Product.find()
    .populate("category_id", "name")
    .sort({ createdAt: -1 })
    .limit(8);
};

exports.getBestSeller = async () => {
  return await Product.find()
    .populate("category_id", "name")
    .sort({ sold: -1 })
    .limit(8);
};
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