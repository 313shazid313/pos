const brandSchema = require("../../../model/product-model/product-additional-model/brandModel");

const brandCreate = async (req, res) => {
  try {
    const { name, imageURL, isPublished } = req.body;
    const exist = await brandSchema.exists({ name: name });

    if (exist) {
      return res.json(401, {
        message: "This Brand name is already exists. Please add new one.",
      });
    }

    await brandSchema.create({ name, imageURL, isPublished });
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const brandRead = async (req, res) => {
  try {
    const showAll = await brandSchema.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const brandUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageURL, isPublished } = req.body;
    const updateData = { name, imageURL, isPublished };
    const updateCategory = await brandSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

const getSingleBrand = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter
    const data = await brandSchema.findById(id); // Replace YourModel with your actual model

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  brandCreate,
  brandRead,
  brandUpdate,
  getSingleBrand,
};
