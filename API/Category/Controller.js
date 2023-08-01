const mongoose = require('mongoose');
const Category = require('./Model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected"))
  .catch((error) => console.error("DB connection error:", error));

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving categories.",
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const { CategoryName, CategoryImage } = req.body;
  if (!CategoryName || !CategoryImage) {
    return res.status(400).json({
      message: "Both CategoryName and CategoryImage are required fields.",
    });
  }

  try {
    const checkExistence = await Category.exists({ CategoryName });
    if (checkExistence) {
      return res.status(400).json({
        message: "This category already exists.",
      });
    }

    const newCategory = await Category.create({ CategoryName, CategoryImage });
    res.status(201).json({
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the category.",
      error: error.message,
    });
  }
};

const getCategoryByName = async (req, res) => {
  const category = await Category.findOne({ name: req.params.name });

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.json(category);
};

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.json(category);
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.json(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.json({ message: "Category deleted" });
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
