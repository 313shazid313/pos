const mongoose = require("mongoose");

const vatSchema = new mongoose.Schema(
  {
    vatAmount: {
      type: Number,
      required: [true, "Vat is required"],
    },
  },
  { timestamps: true }
);

const VatModel = mongoose.model("Vat", vatSchema);
module.exports = VatModel;
