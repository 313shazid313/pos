const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    isPublished: {
      type: Boolean,
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
  timestamps: true
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;
