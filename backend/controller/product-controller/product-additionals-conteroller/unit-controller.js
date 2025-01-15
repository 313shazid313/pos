const unitSchema = require("../../../model/product-model/product-additional-model/unitModel");

const unitCreate = async (req, res) => {
  try {
    const data = req.body;

    const { name } = req.body;
    const exist = await unitSchema.exists({ name: name });

    if (exist) {
      return res.json(401, {
        message: "This unit name is already exists. Please add new one.",
      });
    }

    await unitSchema.create(data);
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const unitRead = async (req, res) => {
  try {
    const showAll = await unitSchema.find().sort({ _id: -1 });
    return res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const unitUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateData = { name };
    const update = await unitSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

const getSingleUnit = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter
    const data = await unitSchema.findById(id); // Replace YourModel with your actual model

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  unitCreate,
  unitRead,
  unitUpdate,
  getSingleUnit,
};
