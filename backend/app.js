const express = require("express");
const cors = require("cors");
const connectDB = require("./db")

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

// routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// app.js

app.use("/uploads", express.static("uploads"));

/*const hpro = async() => {
  const product = require("./models/Product");
  const all = await product.find();
  console.log(all);
  const abc = 0;
  return abc;
}

const Product = require("./models/Product");
const testPopulate = async () => {
  const data = await Product.findOne()
    .populate("category_id", "name");

  console.log(data);
};
testPopulate()*/

// test
app.get("/", (req, res) => {
  res.send("API running...");
});
/*
app.get('/data/:data', (req, res) => {
    const re = req.params.data;
    res.send(`Thông tin: ${re}`);
    console.log(re)
});*/

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});