const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const damageSchema = new mongoose.Schema(
  {
    batchNo: {
      type: String,
      required: true,
    },
    damageQAT: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const damageModel = mongoose.model("Damage", damageSchema);
module.exports = damageModel;
