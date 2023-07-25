const products = [
  { id: 1, name: "Product1" },
  { id: 2, name: "Product2" },
  { id: 3, name: "Product3" },
  { id: 4, name: "Product4" },
  { id: 5, name: "Product5" },
  { id: 6, name: "Product6" },
  { id: 7, name: "Product7" },
  { id: 8, name: "Product8" },
  { id: 9, name: "Product9" },
  { id: 10, name: "Product10" },
];


const allProducts = (req, res) => {
  res.json(products);
};

const productsById = (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).send("Product not found.");
  res.json(product);
};

const productByName = (req, res) => {
  const product = products.find(p => p.name.toLowerCase() === req.params.name.toLowerCase());
  if (!product) return res.status(404).send("Product not found.");
  res.json(product);
};

module.exports = { allProducts, productByName, productsById };