require("dotenv").config();
//async errors

const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

//product route

app.use(notFoundMiddleware); //404 middleware
app.use(errorMiddleware); //It must be placed at the last

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The app is listening on port :${PORT}`);
});
