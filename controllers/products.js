const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const product = await Products.find({}).sort("-name");
  res.status(200).json({ nbHits: product.length, product });
};

//all products dynamic rendering
const getAllProducts = async (req, res) => {
  console.log(req.query); //{ name: 'john', featured: 'true' }
  const { featured, company, name, sort } = req.query; //ony pulling out the featured and company out of the query

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
  let result = Products.find(queryObject); //directly passing the query object
  if (sort) {
    const sortList = sort.split(",").join(" "); //name,-price
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt"); //default sorting based on created at
  }
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
