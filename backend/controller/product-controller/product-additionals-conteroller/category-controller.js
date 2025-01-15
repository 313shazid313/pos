const categorySchema = require("../../../model/product-model/product-additional-model/categoryModel");

const categoryFuncCreate = async (req, res) => {
  try {
    const { name, inHomeCategory, isPublished, imageURL, parentCategoryId } =
      req.body;

    const exist = await categorySchema.exists({ name });

    if (exist) {
      return res.status(409).json({
        message: "This Category name already exists. Please add a new one.",
      });
    }

    await categorySchema.create({
      name,
      parentCategoryId,
      inHomeCategory,
      isPublished,
      imageURL,
    });
    return res.status(201).json({ message: "Category Created Successfully" });
  } catch (error) {
    console.error("Error in category creation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const categoruFuncRead = async (req, res) => {
  try {
    const allCategories = await categorySchema.find().sort({ _id: -1 });

    if (!allCategories) {
      return res.status(201).json({ message: "Categories does not exist" });
    }

    const nestedCates = nestedCategories(allCategories);

    return res.status(201).json(nestedCates);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const nestedCategories = (categories, parentd = null) => {
  const categoryList = [];
  let category;

  if (parentd == null) {
    category = categories.filter((cat) => cat.parentCategoryId == null);
  } else {
    category = categories.filter(
      (cat) => String(cat.parentCategoryId) == String(parentd)
    );
  }

  for (let cate of category) {
    categoryList.push({
      id: cate.id,
      name: cate.name,
      inHomeCategory: cate.inHomeCategory,
      isPublished: cate.isPublished,
      parentCategoryId: cate.parentCategoryId,
      imageURL: cate.imageURL,
      children: nestedCategories(categories, cate.id),
    });
  }
  return categoryList;
};

const categoryFuncUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isPublished, parentCategoryId } = req.body;
    const updateData = { name, isPublished, parentCategoryId };
    const updateCategory = await categorySchema.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter
    const data = await categorySchema.findById(id); // Replace YourModel with your actual model

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  categoryFuncCreate,
  categoruFuncRead,
  categoryFuncUpdate,
  getSingleCategory,
};
