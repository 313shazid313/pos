const customerSchema = require("../../model/additionals-model/customerModel");

const customerCreate = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    await customerSchema.create({ name, phone, email, address });
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const customerRead = async (req, res) => {
  try {
    const showAll = await customerSchema.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const customerUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;
    const updateData = { name, phone, email, address };
    const updateCategory = await customerSchema.findByIdAndUpdate(
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

const getSingleCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await customerSchema.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  customerCreate,
  customerRead,
  customerUpdate,
  getSingleCustomer,
};
