const stockSchema = require("../../model/additionals-model/stockModel");

const stockCreate = async (req, res) => {
  try {
    const {
      productNameId,
      supplierId,
      batchNo,
      quantity,
      date,
      unitPrice,
      totalPrice,
      note,
    } = req.body;

    const stockExist = await stockSchema.exists({ batchNo: batchNo });

    console.log(stockExist);

    if (stockExist) {
      return res.json(401, {
        message: "This batch number is already exists in the stock.",
      });
    }

    const data = await stockSchema.create({
      productNameId,
      supplierId,
      quantity,
      date,
      unitPrice,
      totalPrice,
      note,
      batchNo,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const stockRead = async (req, res) => {
  try {
    const showAll = await stockSchema
      .find()
      .populate("productNameId")
      .populate("supplierId")
      .sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const stockUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productNameId,
      supplierId,
      quantity,
      date,
      unitPrice,
      totalPrice,
      note,
      batchNo,
    } = req.body;
    const updateData = {
      productNameId,
      supplierId,
      quantity,
      date,
      unitPrice,
      totalPrice,
      note,
      batchNo,
    };
    const updateCategory = await stockSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

const getSingleStock = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter
    const data = await stockSchema
      .findById(id)
      .populate("productNameId")
      .populate("supplierId");

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  stockCreate,
  stockRead,
  stockUpdate,
  getSingleStock,
};
