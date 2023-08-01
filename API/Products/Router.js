// const express = require("express");
// const router = express.Router();
// const {
//   allProducts,
//   productByName,
//   productsById,
// } = require("./Controller");

// router.route("/products").get(allProducts);

// router.route("/products/:id").get(productsById);

// router.route("/products/name/:name").get(productByName);

// module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.post("/createProduct", controller.createProduct);
router.get("/productByBrand/:brand", controller.getProductByBrand);
router.get("/productByCategory/:category", controller.getProductByCategory);
router.put("/updateProduct/:id", controller.updateProduct);
router.delete("/deleteProduct/:id", controller.deleteProduct);

module.exports = router;
