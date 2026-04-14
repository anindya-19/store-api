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
    process.exit(0); // to exit the process once the data is updated; 0 - > everything went well
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
