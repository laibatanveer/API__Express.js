const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3030;
const path = require("path");

const registrationRouter = require("./API/Registration/Router");
const productRouter = require("./API/Products/Router");
const categoryRouter = require("./API/Category/Router");
const brandsRouter = require("./API/Brands/Router");
const orderRouter = require("./API/Order/Router");
const mailRouter = require("./API/Mailer/Router");

app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "./dist")));
app.use("/api/registration", registrationRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/order", orderRouter);
app.use("/api/mail", mailRouter);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./dist/index.html"))
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
