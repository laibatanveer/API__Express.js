const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3000;

const registrationRouter = require("./API/Registration/Router");
const productRouter = require("./API/Products/Router");
const categoryRouter = require("./API/Category/Router");
const brandsRouter = require("./API/Brands/Router");

require("dotenv").config();
console.log(process.env.MONGO_URI);
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.error("DB connection error:", error));

app.use(express.json());
app.use(cors());
app.use("/registration", registrationRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/brands", brandsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
