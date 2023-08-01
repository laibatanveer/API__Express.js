const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  thumbnail: { type: String, required: true },
  imageArray: { type: [String], required: true },
  description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
