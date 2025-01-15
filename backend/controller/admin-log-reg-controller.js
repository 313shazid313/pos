const AdminSchema = require("../model/adminFormModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");

const adminRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const ifExist = await AdminSchema.findOne({ username });

    if (ifExist) {
      return res.status(409).json({ message: "user already exist" });
    }

    const creation = await AdminSchema.create({
      username,
      password,
    });

    return res.status(201).json({
      message: "registration successful",
      userId: creation._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const ifExist = await AdminSchema.findOne({ username });
    console.log(ifExist);

    if (!ifExist) {
      return res.status(409).json({ message: "Invalid Username" });
    }

    const isValid = await bcrypt.compare(password, ifExist.password);

    if (!isValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = await generateToken(ifExist._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).send({
      message: "Logged in successfully!",
      token,
      user: {
        _id: ifExist._id,
        username: ifExist.username,
        isAdmin: ifExist.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "user logout success" });
  } catch (error) {
    next(error);
  }
};

module.exports = { adminLogin, adminRegister, adminLogout };
