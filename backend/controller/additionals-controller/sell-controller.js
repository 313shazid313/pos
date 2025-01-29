const sellSchema = require("../../model/additionals-model/sellModel");
const stockSchema = require("../../model/additionals-model/stockModel");

const sellCreate = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
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

    const invoiceExist = await stockSchema.findOne({ invoiceNo });
    if (invoiceExist) {
      return res.status(400).json({
        message: "This invoice number already exists in the sell record.",
      });
    }

    const updatedProducts = [];
    for (const { productNameId, quantity, name, totalPrice, vat, vatPerProduct, price} of products) {
      const stockItem = await stockSchema.findOne({ productNameId });

      if (!stockItem) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ message: `Item ${name} not found in stock!` });
      }

      if (stockItem.quantity < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for item ${name}. Available: ${stockItem.quantity}`,
        });
      }

      stockItem.quantity -= quantity;
      await stockItem.save();
      updatedProducts.push({ productNameId, quantity, name, totalPrice, vat, vatPerProduct, price });
    }

    const sellRecord = await sellSchema.create([
      {
        products: updatedProducts,
        customerName,
        customerPhone,
        invoiceNo,
        date,
        reference,
        discount,
        discountType,
        note,
        paymentType,
        subtotal,
        total,
        vat,
      },
    ]);

    return res.status(201).json(sellRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Sell Creation failed" });
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

const readSellById = async (req, res) => {
  try {
    const { id } = req.params;
    const sellData = await sellSchema
      .findById(id)
      .populate("customerName")
      .populate("paymentType");

    // Check if data exists
    if (!sellData) {
      return res.status(404).json({ message: "Sell data not found" });
    }

    return res.status(200).json(sellData);
  } catch (error) {
    console.error("Error fetching sell data:", error);
    return res
      .status(500)
      .json({ message: "Sell Error", error: error.message });
  }
};


const returnedButtonFunction = async ()=>{
  try {
    const { id } = req.params;
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
} 


module.exports = { sellCreate, readAllSell, readSellById, returnedButtonFunction };
