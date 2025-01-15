const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    // imageURL: {
    //   type: String,
    //   required: false,
    // },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BrandModel = mongoose.model("Brand", brandSchema);
module.exports = BrandModel;
