// services/homeService.js
const Product = require("../models/Product");
const Category = require("../models/Category");
const Banner = require("../models/Banner");

exports.getHomeData = async () => {
  const banners = await Banner.find().limit(5);

  const featuredProducts = await Product.find({ featured: true }).limit(8);

  const newProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(8);

  const bestSellers = await Product.find()
    .sort({ sold: -1 })
    .limit(8);

  const categories = await Category.find();

  return {
    banners,
    featuredProducts,
    newProducts,
    bestSellers,
    categories
  };
};