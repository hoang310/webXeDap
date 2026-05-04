
const product = require("../models/Product");


exports.getAllProducts = async (query) => {

  const all = await product.find();
  console.log("ee pro");

  return all;
};

exports.getCollect = async () => {
  consolog.log("line 14");
  const getCP = await product.find().populate('category_id').exec();

  consolog.log(getCP);

  return getCP;
}