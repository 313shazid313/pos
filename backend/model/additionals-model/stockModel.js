const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    productNameId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    batchNo: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const stockModel = mongoose.model("Stock", stockSchema);
module.exports = stockModel;
