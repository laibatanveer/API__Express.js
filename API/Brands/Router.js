const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.post("/createBrand", controller.createBrand);
router.get("/allBrands", controller.getAllBrands);
router.get("/brandByName", controller.getBrandByName);
router.get("/brandById", controller.getBrandById);
router.put("/updateBrand/:_id", controller.updateBrand);
router.delete("/deleteBrand/:_id", controller.deleteBrand);

module.exports = router;
