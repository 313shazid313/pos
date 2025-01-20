const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const sellSchema = new mongoose.Schema(
  {
    customerName: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const sellModel = mongoose.model("Damage", sellSchema);
module.exports = sellModel;
