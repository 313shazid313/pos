const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

const adminSchema = new mongooose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//!hiding password using bcrypt starts --->
adminSchema.pre("save", async function (next) {
  console.log("pre method", this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  } else {
    try {
      const solting = await bcrypt.genSalt(10);
      const hashPossard = await bcrypt.hash(user.password, solting);
      user.password = hashPossard;
    } catch (error) {
      next(error);
    }
  }
});

//!hiding password using bcrypt ends --->
// adminSchema.methods.generateToken = async function () {
//   //! instance method
//   try {
//     return jwt.sign(
//       {
//         userId: this._id.toString(), //? these are payload
//         isAdmin: this.isAdmin, //? these are payload
//       },
//       process.env.SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

const AdminSchema = new mongooose.model("User", adminSchema);
module.exports = AdminSchema;
