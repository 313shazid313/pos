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
        value: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        label: { type: String, required: true },
        totalPrice: { type: Number },
        vat: { type: Number },
        vatPerProduct: { type: Number },
        price: { type: Number },
        originalQuantity: { type: Number },
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
    returned: {
      type: Boolean,
      default: false,
    },
    disCountPercentage: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

const sellModel = mongoose.model("Sell", sellSchema);
module.exports = sellModel;
