const express = require('express');
const router = express.Router();
const controller = require('./Controller');

router.post('/createBrand', controller.createBrand);
router.get('/brandByName/:name', controller.getBrandByName);
router.get('/brandById/:id', controller.getBrandById);
router.put('/updateBrand/:id', controller.updateBrand);
router.delete('/deleteBrand/:id', controller.deleteBrand);

module.exports = router;
