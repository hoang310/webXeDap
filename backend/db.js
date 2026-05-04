const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://hoanggf310_db_user:XidPG3es7la92sZ2@cluster0.ljj3hjz.mongodb.net/bike?appName=Cluster0"
    );
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.log("ErrorDB:", error);
  }
}

module.exports = connectDB;
