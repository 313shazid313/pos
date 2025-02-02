const mongoose = require("mongoose");
const { Schema } = mongoose;

const SellReturnSchema = new Schema(
  {
    sellInfo: {
      type: Schema.Types.ObjectId,
      ref: "Sell",
      required: true, // Assuming this should be mandatory
    },
    returnedItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        label: { type: String },
        totalPrice: { type: Number, required: true, min: 0 },
        vat: { type: Number, default: 0 },
        vatPerProduct: { type: Number, default: 0 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    refundAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    // refundMethod: {
    //   type: String,
    //   enum: ["Cash", "Bank Transfer", "Store Credit", "Original Payment Method"],
    //   required: true,
    // },
    returnDate: {
      type: Date,
      default: Date.now,
    },
    // status: {
    //   type: String,
    //   enum: ["Pending", "Approved", "Rejected", "Completed"],
    //   default: "Pending",
    // },
    returnReason: {
      type: String,
    },
  },
  { timestamps: true }
);

const SellReturn = mongoose.model("SellReturn", SellReturnSchema);
module.exports = SellReturn;
