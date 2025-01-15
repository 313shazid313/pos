const supplierSchema = require("../../model/additionals-model/supplierModel");

const supplierCreate = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    await supplierSchema.create({ name, phone, email, address });
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const supplierRead = async (req, res) => {
  try {
    const showAll = await supplierSchema.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const supplierUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;
    const updateData = { name, phone, email, address };
    const updateCategory = await supplierSchema.findByIdAndUpdate(
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

const getSingleSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await supplierSchema.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  supplierCreate,
  supplierRead,
  supplierUpdate,
  getSingleSupplier,
};
