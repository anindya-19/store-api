require("dotenv").config();
require("express-async-errors");
//async errors

const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productsRouter);

//product route

app.use(notFoundMiddleware); //404 middleware
app.use(errorMiddleware); //It must be placed at the last

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    //mongodb connect
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully...");
    app.listen(PORT, () => {
      console.log(`The server is listening on port : ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
