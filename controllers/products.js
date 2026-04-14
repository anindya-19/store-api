const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "wooden";
  const product = await Products.find({
    name: { $regex: search, $options: "i" },
  });
  res.status(200).json({ nbHits: product.length, product });
};

//all products dynamic rendering
const getAllProducts = async (req, res) => {
  console.log(req.query); //{ name: 'john', featured: 'true' }
  const { featured, company, name } = req.query; //ony pulling out the featured and company out of the query

  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false; //set a featured property to the query object
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject);
  const products = await Products.find(queryObject); //directly passing the query object
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
