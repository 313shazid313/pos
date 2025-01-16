const paymentSchema = require("../../model/additionals-model/paymentTypeModel");

const paymentTypeCreate = async (req, res) => {
  try {
    const resp = req.body;

    const { name } = req.body;
    const exist = await paymentSchema.exists({ name: name });

    if (exist) {
      return res.json(401, {
        message: "Payment method already exists please add new one.",
      });
    }

    await paymentSchema.create(resp);
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const paymentTypeRead = async (req, res) => {
  try {
    const showAll = await paymentSchema.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const paymentTypeUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateData = { name };
    const update = await paymentSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

const getSinglePaymentType = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await paymentSchema.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  paymentTypeCreate,
  paymentTypeRead,
  paymentTypeUpdate,
  getSinglePaymentType,
};
