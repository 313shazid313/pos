const typeSchema = require("../../../model/product-model/product-additional-model/typeModel");

const typeCreate = async (req, res) => {
  try {
    const data = req.body;

    const { name } = req.body;
    const exist = await typeSchema.exists({ name: name });

    if (exist) {
      return res.json(401, {
        message: "This type name already exists please add new one.",
      });
    }

    await typeSchema.create(data);
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const typeRead = async (req, res) => {
  try {
    const showAll = await typeSchema.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const typeUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateData = { name };
    const update = await typeSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

const getSingleType = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter
    const data = await typeSchema.findById(id); // Replace YourModel with your actual model

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  typeCreate,
  typeRead,
  typeUpdate,
  getSingleType,
};
