const sellSchema = require("../../model/additionals-model/sellModel");
const stockSchema = require("../../model/additionals-model/stockModel");

const sellCreate = async (req, res) => {
  try {
    const {
      customerName,
      invoiceNo,
      date,
      reference,
      products,
      discount,
      discountType,
      note,
      paymentType,
      subtotal,
      total,
      vat,
    } = req.body;

    const invoiceExist = await stockSchema.findOne({
      invoiceNo: invoiceNo,
    });

    if (invoiceExist) {
      return res.status(401).json({
        message: "This invoice number is already exists in the sell record.",
      });
    }

    for (const { productNameId, quantity } of products) {
      try {
        const stockItem = await stockSchema.findOne({ productNameId });

        if (!stockItem) {
          res.status(500).json({ message: "Item not found in Stock !" });
          continue;
        }

        if (stockItem.quantity < quantity) {
          res.status(500).json({ message: "Insufficient Quantity !" });
          continue;
        }

        stockItem.quantity -= quantity;
        await stockItem.save();

        const sellRecord = await sellSchema.create({
          products,
          customerName,
          invoiceNo,
          date,
          reference,
          productNameId,
          quantity,
          discount,
          discountType,
          note,
          paymentType,
          subtotal,
          total,
          vat,
        });

        return res.status(200).json(sellRecord);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Sell Error1" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Sell Error" });
  }
};

const readAllSell = async (req, res) => {
  try {
    const sellData = await sellSchema
      .find()
      .sort({ _id: -1 })
      .populate("customerName")
      .populate("paymentType");

    // Check if data exists
    if (!sellData || sellData.length === 0) {
      return res.status(404).json({ message: "No sell data found" });
    }

    return res.status(200).json(sellData);
  } catch (error) {
    console.error("Error fetching sell data:", error); // Log the actual error for debugging
    return res
      .status(500)
      .json({ message: "Sell Error", error: error.message });
  }
};

module.exports = { sellCreate, readAllSell };
