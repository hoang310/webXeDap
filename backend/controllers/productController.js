// controllers/productController.js
const path = require('path')
const fs = require('fs')
const productService = require("../services/productService"); 

// Create product
exports.createProduct = async (req, res) => {
  try {

    const { name, price, stock, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    if (!stock) {
      return res.status(400).json({ message: "Stock is required" });
    }

    if (!category_id) {
      return res.status(400).json({ message: "Category is required" });
    }

    const data = {
      ...req.body,
      image: req.file ? req.file.originalname : req.body.image
    };

    const product = await productService.createProduct(data);

    res.status(201).json(product);

  } catch (error) {
    console.log(req.body);
    console.log(req.file);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Get products failed" });
  }
}; 

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Get product failed" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {

    const data = {
      ...req.body,
      image: req.file ? req.file.originalname : req.body.image
    };

    const product = await productService.updateProduct(
      req.params.id,
      data
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Update product failed" });
    console.log(req.body);
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Delete product success" });
  } catch (error) {
    res.status(500).json({ message: "Delete product failed" });
  }
};

// Featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await productService.getFeatured();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Get featured products failed" });
  }
};

// Newest products
exports.getNewestProducts = async (req, res) => {
  try {
    const products = await productService.getNewest();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Get newest products failed" });
  }
};

// Best seller products
exports.getBestSellerProducts = async (req, res) => {
  try {
    const products = await productService.getBestSeller();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Get best seller products failed" });
  }
};

exports.getImages = async (req, res) => {

  const uploadPath = path.join(__dirname, "..", "..", "uploads");

  fs.readdir(uploadPath, (err, files) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(files);

  });

};