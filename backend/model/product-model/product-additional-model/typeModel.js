const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { timestamps: true }
);

const TypeModel = mongoose.model("Type", typeSchema);
module.exports = TypeModel;
