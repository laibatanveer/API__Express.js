const express = require('express');
const router = express.Router();
const categoryController = require('./Controller');

router.post('/createCategory', categoryController.createCategory);
router.get('/allCategories', categoryController.getAllCategories);
router.get('/categoryByName/:name', categoryController.getCategoryByName);
router.get('/categoryById/:id', categoryController.getCategoryById);
router.put('/updateCategory/:id', categoryController.updateCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = router;
