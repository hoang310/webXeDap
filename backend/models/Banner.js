const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: String,
  link: String
});

module.exports = mongoose.model("Banner", bannerSchema);