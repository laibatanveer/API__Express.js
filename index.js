const express = require("express");
const app = express();
require("dotenv").config();
const port = 3000;

const registrationRouter = require("./API/Registration/Router");
const productRouter = require("./API/Products/Router");
const categoryRouter = require("./API/Category/Router");
const brandsRouter = require("./API/Brands/Router");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/registration", registrationRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/brands", brandsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
