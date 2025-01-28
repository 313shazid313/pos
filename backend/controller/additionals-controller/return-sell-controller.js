const sellReturnSchema = require("../../model/additionals-model/returnSellModel");
const stockSchema = require("../../model/additionals-model/stockModel");

const returnSellCreate = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error fetching sell data:", error);
    return res
      .status(500)
      .json({ message: "Sell Error", error: error.message });
  }
};

module.exports = { returnSellCreate };
