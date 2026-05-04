const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

// CRUD
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/", upload.single("image"), productController.createProduct);

// extra
router.get("/featured/list", productController.getFeaturedProducts);
router.get("/newest/list", productController.getNewestProducts);
router.get("/bestseller/list", productController.getBestSellerProducts);

module.exports = router; 