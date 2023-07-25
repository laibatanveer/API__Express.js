const express = require("express");
const router = express.Router();
const {
  allProducts,
  productByName,
  productsById,
} = require("./Controller");

router.route("/products").get(allProducts);

router.route("/products/:id").get(productsById);

router.route("/products/name/:name").get(productByName);

module.exports = router;
