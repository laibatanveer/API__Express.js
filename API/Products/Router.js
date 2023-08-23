const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.post("/createProduct", controller.createProduct);

router.get("/allProducts", controller.getAllProducts);

router.get("/brand/:brand", controller.getProductsByBrand);

router.get("/category/:category", controller.getProductsByCategory);

router.get("/product/:_id", controller.getProductById);

router.get("/name/:ProductName", controller.getProductByName);

router.put("/updateProduct", controller.updateProduct);

router.delete("/deleteProduct/:_id", controller.deleteProduct);

module.exports = router;
