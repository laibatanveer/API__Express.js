const Product = require("./Model");
const { connect } = require("mongoose");
require("dotenv").config();

const getAllProducts = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const allProducts = await Product.find();
    res.json({
      Product: allProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { _id } = req.params;

  try {
    await connect(process.env.MONGO_URI);
    const foundProduct = await Product.findOne({ _id });
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ foundProduct });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductByName = async (req, res) => {
  const { ProductName } = req.params;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const Product = await Product.findOne({ ProductName });
    res.json({ Product });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
const getProductsByBrand = async (req, res) => {
  const { brand } = req.params;

  try {
    await connect(process.env.MONGO_URI);
    const products = await Product.find({ brand });
    res.json({ products });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    await connect(process.env.MONGO_URI);
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  const { ProductName, ProductImage, brand, category, price } = req.body;

  if (!ProductName || !ProductImage || !brand || !category || !price) {
    return res.status(403).json({
      message: "Missing Required Field",
    });
  }

  try {
    await connect(process.env.MONGO_URI);
    await Product.syncIndexes();

    const checkExisting = await Product.exists({ ProductName });

    if (checkExisting) {
      return res.status(400).json({
        message: "Product Already Exists",
      });
    }

    await Product.create({ ProductName, ProductImage, brand, category, price });
    const allProducts = await Product.find();

    res.json({
      message: "Product Added Successfully7",
      Product: allProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { _id } = req.params;
  

  try {
    await connect(process.env.MONGO_URI);
    await Product.deleteOne({ _id });
    const product = await Product.find();
    res.status(200).json({
      message: "Deleted Successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { _id, ProductName, ProductImage, brand, category, price } = req.body;

  const filter = { _id };
  const update = { ProductName, ProductImage, brand, category, price };

  try {
    await connect(process.env.MONGO_URI);
    await Product.syncIndexes();

    await Product.findOneAndUpdate(filter, update, {
      new: true,
    });

    const updatedProducts = await Product.find(); // renamed the variable to avoid conflict

    res.json({
      message: "Successfully updated",
      Product: updatedProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  getProductsByBrand,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
