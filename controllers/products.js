const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const product = await Products.find({ name: "armchair" });
  res.status(200).json({ product, nbHits: product.length });
};
const getAllProducts = async (req, res) => {
  console.log(req.query); //{ name: 'john', featured: 'true' }
  const { featured } = req.query;
  const products = await Products.find(req.query); //directly passing the query object
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
