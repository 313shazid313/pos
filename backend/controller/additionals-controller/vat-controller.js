const vatSchema = require("../../model/additionals-model/vatModel");

const vatCreate = async (req, res) => {
  try {
    const { vatAmount } = req.body;
    const vatData = await vatSchema.create({ vatAmount });
    return res.status(200).json(vatData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const vatRead = async (req, res) => {
  try {
    const showAll = await vatSchema.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const vatUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { vatAmount } = req.body;
    const updateData = { vatAmount };
    const updateCategory = await vatSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

module.exports = {
  vatCreate,
  vatRead,
  vatUpdate,
};
