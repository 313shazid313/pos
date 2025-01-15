const damageSchema = require("../../model/additionals-model/damageModel");
const stockSchema = require("../../model/additionals-model/stockModel");

const damageCreate = async (req, res) => {
  try {
    const { batchNo, damageQAT } = req.body;

    const stockItem = await stockSchema.findOne({
      batchNo: batchNo,
    });

    if (!stockItem) {
      return res.status(404).json({
        message: "Batch no not found in the stock",
      });
    }

    // console.log(stockItem.quantity);

    if (stockItem.quantity < damageQAT) {
      return res.status(400).json({ message: "Insufficient stock quantity" });
    }

    stockItem.quantity -= damageQAT;
    await stockItem.save();

    const damageRecord = await damageSchema.create({
      batchNo,
      damageQAT,
    });

    return res.status(200).json({
      message: "Damage data added and stock updated successfully",
      data: damageRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "top G" });
  }
};

const damageRead = async (req, res) => {
  try {
    const showAll = await damageSchema
      .find()
      .sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const damageUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { productNameId, damageQAT } = req.body;
    const updateData = { productNameId, damageQAT };
    const updateCategory = await damageSchema.findByIdAndUpdate(
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

const getSingleDamage = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter
    const data = await damageSchema.findById(id); // Replace YourModel with your actual model

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  damageCreate,
  damageRead,
  damageUpdate,
  getSingleDamage,
};
