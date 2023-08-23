const mongoose = require("mongoose");
const { connect } = require("mongoose");

const Category = require("./Model");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

    await Category.create({ CategoryName, CategoryImage });
    const newCategory = await Category.find();
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

const getCategoryById = async (req, res) => {
  const { _id } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const category = await Category.findOne({ _id });
    res.json({ category });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getCategoryByName = async (req, res) => {
  const { CategoryName } = req.params;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const category = await category.findOne({ CategoryName });
    res.json({ category });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  const { _id } = req.params;

  try {
    await connect(process.env.MONGO_URI);

    await Category.deleteOne({ _id });
    const category = await Category.find();
    res.status(200).json({
      message: "Deleted Successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const { _id, CategoryName, CategoryImage } = req.body;

  const filter = { _id };
  const update = { CategoryName, CategoryImage };

  try {
    await connect(process.env.MONGO_URI);

    await Category.findOneAndUpdate(filter, update, {
      new: true,
    });

    const category = await Category.find();

    res.json({
      message: "Successfully updated",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
