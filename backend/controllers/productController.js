// controllers/productController.js

const productService = require("../services/productService"); 

// Create product
exports.createProduct = async (req, res) => {
  try {

    const { name, price, stock, category_id, image} = req.body;

    if (!name) {
      console.log(name)
      return res.status(400).json({ message: "Name is required" });
    }
    else if (!price) {
      console.log(price)
      return res.status(400).json({ message: "Price is required" });
    }
    else if (!stock) {
      console.log(stock)
      return res.status(400).json({ message: "Stock is required" });
    }
    else if (!category_id) {
      console.log(category_id)
      return res.status(400).json({ message: "Category is required" });
    }
    else if (!image) {
      console.log(image)
      return res.status(400).json({ message: "Image is required" });
    }
    else {
      const product = await productService.createProduct(req.body);
      console.log("productServices.createProduct")
      res.status(201).json(product);
    }
      
    /*const data = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };*/
  } catch (error) {
    res.status(500).json({ message: "Create product failed" });
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
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Update product failed" });
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