const service = require("../services/service")

exports.getAllProduct = async (req, res) => {
  try {
    const all = await service.getAllProducts();
    res.status(201).json(all);
  } catch (error) {
    res.status(500).json({ message: "Get products failed"});
  }
}

exports.getAllProductC = async (req, res) => {
  try {
    const all = await service.getCollect();
    res.status(201).json(all);
  } catch (error) {
    res.status(500).json({ message: "Get products failed cai nay la moi"});
  }
}