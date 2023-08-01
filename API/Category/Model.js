const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  CategoryName: {
     type: String,
     required: true, 
     unique: true 
  },
  CategoryImage: {
     type: String,
     required: true
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
