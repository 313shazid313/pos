const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const sellSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: false,
    },
    customerPhone: {
      type: Number,
      required: true,
    },
    invoiceNo: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    reference: {
      type: String,
      required: false,
    },
    products: [
      {
        productNameId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        name: { type: String, required: true },
      },
    ],
    paymentType: {
      type: Schema.Types.ObjectId,
      ref: "PaymentType",
    },
    discount: {
      type: Number,
      required: false,
    },
    discountType: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    vat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const sellModel = mongoose.model("Sell", sellSchema);
module.exports = sellModel;
