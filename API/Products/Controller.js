// const products = [
//   { id: 1, name: "Product1" },
//   { id: 2, name: "Product2" },
//   { id: 3, name: "Product3" },
//   { id: 4, name: "Product4" },
//   { id: 5, name: "Product5" },
//   { id: 6, name: "Product6" },
//   { id: 7, name: "Product7" },
//   { id: 8, name: "Product8" },
//   { id: 9, name: "Product9" },
//   { id: 10, name: "Product10" },
// ];


// const allProducts = (req, res) => {
//   res.json(products);
// };

// const productsById = (req, res) => {
//   const product = products.find(p => p.id === Number(req.params.id));
//   if (!product) return res.status(404).send("Product not found.");
//   res.json(product);
// };

// const productByName = (req, res) => {
//   const product = products.find(p => p.name.toLowerCase() === req.params.name.toLowerCase());
//   if (!product) return res.status(404).send("Product not found.");
//   res.json(product);
// };

// module.exports = { allProducts, productByName, productsById };

const Product = require('../models/product');

const createProduct = async (req, res) => {
  const { name, price, category, brand, thumbnail, imageArray, description } = req.body;
  const product = new Product({
    name,
    price,
    category,
    brand,
    thumbnail,
    imageArray,
    description
  });

  await product.save();
  res.status(201).json(product);
};

const getProductByBrand = async (req, res) => {
  const products = await Product.find({ brand: req.params.brand });
  res.json(products);
};

const getProductByCategory = async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);
};

const updateProduct = async (req, res) => {
  const { name, price, category, brand, thumbnail, imageArray, description } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name,
    price,
    category,
    brand,
    thumbnail,
    imageArray,
    description
  }, { new: true });

  if (!product) {
    return res.status(404).send('Product not found');
  }
  
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.json({ message: 'Product deleted' });
};

module.exports = {
  createProduct,
  getProductByBrand,
  getProductByCategory,
  updateProduct,
  deleteProduct
};
