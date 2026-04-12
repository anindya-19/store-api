require("dotenv").config();

const Product = require("./models/product");
const productsJson = require("./products.json");
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); //to delete all the pre-existing products
    await Product.create(productsJson); // array of objects is passed
    console.log("Connection successful..");
  } catch (error) {
    console.log(error);
  }
};

start();
