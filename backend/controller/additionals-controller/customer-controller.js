const CustomerModel = require("../../model/additionals-model/customerModel");


const customerCreate = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    // Check if phone number already exists
    const phoneExist = await CustomerModel.findOne({ phone });

    if (phoneExist) {
      return res.status(400).json({
        message: "This Customer already exists.",
      });
    }

    // Create new customer
    const data = await CustomerModel.create({ name, phone, email, address });

    return res.status(200).json({
      message: "Customer Created successfully",
      data: data,
    });

  } catch (error) {
    return res.status(500).json({ message: "Customer create error", error });
  }
};

module.exports = customerCreate;

const customerRead = async (req, res) => {
  try {
    const showAll = await CustomerModel.find().sort({ _id: -1 });
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
    const updateCategory = await CustomerModel.findByIdAndUpdate(
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
    const data = await CustomerModel.findById(id);

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

    const customer = await CustomerModel.findOne({ phone });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Cant find by phone" });
  }
};

module.exports = {
  customerCreate,
  customerRead,
  customerUpdate,
  getSingleCustomer,
  getCustomerByPhone,
};
