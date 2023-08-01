const express = require('express');
const router = express.Router();
const controller = require('./Controller');

router.post('/createBrand', controller.createBrand);
router.get('/getAllBrands', controller.getAllBrands);

router.get('/brandByName', controller.getBrandByName);
router.get('/brandById', controller.getBrandById);
router.put('/updateBrand/', controller.updateBrand);
router.delete('/deleteBrand', controller.deleteBrand);

module.exports = router;
