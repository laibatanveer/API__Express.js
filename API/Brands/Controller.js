const Brand = require("./Model");
const { connect } = require("mongoose");
require("dotenv").config();

const getAllBrands = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const allBrands = await Brand.find();
    res.json({
      Brand: allBrands,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getBrandById = async (req, res) => {
  const { _id } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const foundBrand = await Brand.findOne({ _id });

    res.json({ foundBrand });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getBrandByName = async (req, res) => {
  const { BrandName } = req.params;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const Brand1 = await Brand.findOne({ BrandName });
    res.json({ Brand1 });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const createBrand = async (req, res) => {
  const { BrandName, BrandImage } = req.body;

  if (!BrandName || !BrandImage) {
    res.status(403).json({
      message: "Missing Required Field",
    });
  } else {
    try {
      await connect(process.env.MONGO_URI);
      const checkExisting = await Brand.exists({ BrandName });
      await Brand.syncIndexes();

      if (checkExisting) {
        res.status(400).json({
          message: "Brand Already Exists",
        });
      } else {
        await Brand.create({ BrandName, BrandImage });
        const allBrands = await Brand.find();

        res.json({
          message: "DB Connected",
          Brand: allBrands,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
};

const deleteBrand = async (req, res) => {
  const { _id } = req.params;

  try {
    await connect(process.env.MONGO_URI);
    await Brand.deleteOne({ _id });
    const Brand1 = await Brand.find();
    res.status(200).json({
      message: "Deleted Successfully",
      Brand1,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateBrand = async (req, res) => {
  const { BrandName, BrandImage } = req.body;
  const { _id } = req.params;

  const filter = { _id };
  const update = { BrandName, BrandImage };

  try {
    await connect(process.env.MONGO_URI);

    await Brand.findOneAndUpdate(filter, update);

    const updatedBrand = await Brand.find();

    res.json({
      message: "Successfully updated",
      updatedBrand,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  getBrandByName,
  createBrand,
  updateBrand,
  deleteBrand,
};
