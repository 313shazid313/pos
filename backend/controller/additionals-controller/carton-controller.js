const cartonModel = require("../../model/additionals-model/cartonModel");

const cartonCreate = async (req, res) => {
  try {
    const resp = req.body;

    const { name } = req.body;
    const exist = await cartonModel.exists({ name: name });

    if (exist) {
      return res.json(401, {
        message: "Origin already exists please add new one.",
      });
    }

    await cartonModel.create(resp);
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const cartonRead = async (req, res) => {
  try {
    const showAll = await cartonModel.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const cartonUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateData = { name };
    const update = await cartonModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};

const getSingleCarton = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cartonModel.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getSingleCarton,
  cartonUpdate,
  cartonRead,
  cartonCreate,
};
