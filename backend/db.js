const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB() {
  try {
    const mongo = process.env.MONGO_URI;
    await mongoose.connect(
      mongo
    );
    console.log("MongoDB Atlas connected");
    

    
  } catch (error) {
    console.log("ErrorDB:", error);
  }
}

module.exports = connectDB;
