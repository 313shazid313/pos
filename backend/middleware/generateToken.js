const UserModel = require("../model/adminFormModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET

const generateToken = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const token = jwt.sign({userId:user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Error generating token", error);
    throw error;
  }
};

module.exports = generateToken;