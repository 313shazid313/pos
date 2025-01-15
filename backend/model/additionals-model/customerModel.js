const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
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

const CustomerModel = mongoose.model("Customer", customerSchema);
module.exports = CustomerModel;
