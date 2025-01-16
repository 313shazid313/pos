const mongoose = require("mongoose");

const paymentTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { timestamps: true }
);

const PaymentTypeModel = mongoose.model("PaymentType", paymentTypeSchema);
module.exports = PaymentTypeModel;
