const Brand = require('./Model');

const createBrand = async (req, res) => {
  const { name } = req.body;
  const brand = new Brand({ name });

  await brand.save();
  res.status(201).json(brand);
};

const getBrandByName = async (req, res) => {
  const brand = await Brand.findOne({ name: req.params.name });
  if (!brand) return res.status(404).send("Brand not found.");
  res.json(brand);
};

const getBrandById = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) return res.status(404).send("Brand not found.");
  res.json(brand);
};

const updateBrand = async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });

  if (!brand) {
    return res.status(404).send('Brand not found');
  }

  res.json(brand);
};

const deleteBrand = async (req, res) => {
  const brand = await Brand.findByIdAndRemove(req.params.id);

  if (!brand) {
    return res.status(404).send('Brand not found');
  }

  res.json({ message: 'Brand deleted' });
};

module.exports = {
  createBrand,
  getBrandByName,
  getBrandById,
  updateBrand,
  deleteBrand
};
