const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const product = await Products.find({ price: { $gt: 30 } })
    .limit()
    .select("name price")
    .sort("name")
    .skip();
  res.status(200).json({ nbHits: product.length, product });
};

//all products dynamic rendering
const getAllProducts = async (req, res) => {
  console.log(req.query); //{ name: 'john', featured: 'true' }
  const { featured, company, name, sort, fields, numericFilters } = req.query; //ony pulling out the featured and company out of the query

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

  //numeric filter, using >, >= .....
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    const regEx = /\b(<|>|<=|>=|=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`,
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-"); //rating-$gt-40,price-$gt-30
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log(filters);
  }

  console.log(queryObject);
  let result = Products.find(queryObject); //directly passing the query object

  //Sort functionality
  if (sort) {
    const sortList = sort.split(",").join(" "); //name,-price
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt"); //default sorting based on created at
  }

  //select fields, only displays the selected fields
  //{{URL}}/products?fields=name,price
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  //pagenation, to get only limited number of output instead of everything
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 0;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //23 entries total here

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
