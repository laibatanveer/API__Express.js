const express = require("express");
const app = express();
require("dotenv").config();
const port = 3000;
const path = require("path");

const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://laibatanveer:2tAQWhHvYUVwz8Av@banoqabil.nrnpkvd.mongodb.net/?retryWrites=true&w=majority";

  const registrationRouter = require("./API/Registration/Router");
  const productRouter = require("./API/Products/Router");
  const categoryRouter = require("./API/Category/Router");
  const brandsRouter = require("./API/Brands/Router");

  
 
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/registration', registrationRouter);
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/brands', brandsRouter);



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Pages", "register.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
