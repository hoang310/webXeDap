// controllers/homeController.js
const homeService = require("../services/homeService");

exports.getHomeData = async (req, res) => {
  try {
    const data = await homeService.getHomeData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};