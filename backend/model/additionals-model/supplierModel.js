const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const SupplierModel = mongoose.model("Supplier", supplierSchema);
module.exports = SupplierModel;
