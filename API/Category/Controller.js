const Category = require('./Model');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });

  await category.save();
  res.status(201).json(category);
};

const getCategoryByName = async (req, res) => {
  const category = await Category.findOne({ name: req.params.name });
  
  if (!category) {
    return res.status(404).send('Category not found');
  }
  
  res.json(category);
};

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).send('Category not found');
  }

  res.json(category);
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });

  if (!category) {
    return res.status(404).send('Category not found');
  }

  res.json(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category) {
    return res.status(404).send('Category not found');
  }

  res.json({ message: 'Category deleted' });
};

module.exports = {
  createCategory,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  deleteCategory
};
