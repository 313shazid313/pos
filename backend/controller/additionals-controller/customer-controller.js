const customerSchema = require("../../model/additionals-model/customerModel");

const customerCreate = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    const phoneExist = await customerSchema.findOne({ phone: phone });
    if (phoneExist) {
      return res.status(400).json({
        message: "This phone number already exists.",
      });
    }

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

const getCustomerByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const customer = await customerSchema.findOne({ phone }); 

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  customerCreate,
  customerRead,
  customerUpdate,
  getSingleCustomer,
  getCustomerByPhone,
};
