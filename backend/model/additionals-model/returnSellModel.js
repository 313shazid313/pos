const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const sellReturnSchema = new mongoose.Schema(
  {
    sellId: {
      type: Schema.Types.ObjectId,
      ref: "Sell",
      required: true, 
    },
    returnedProducts: [
      {
        productNameId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    returnReason: {
      type: String,
      required: false,
    },
    refundAmount: {
      type: Number,
      required: true,
    },
    returnDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const sellReturnModel = mongoose.model("SellReturn", sellReturnSchema);
module.exports = sellReturnModel;
