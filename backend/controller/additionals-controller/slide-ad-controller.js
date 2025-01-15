const slideAdSchema = require("../../model/additionals-model/slideAd");

const slideAdCreate = async (req, res) => {
  try {
    const resp = req.body;
    await slideAdSchema.create(resp);
    return res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const slideAdRead = async (req, res) => {
  try {
    const showAll = await slideAdSchema.find().sort({ _id: -1 });
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const slideAdUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, paramLink, page, adSize, isPublished, image } = req.body;
    const updateData = {
      name,
      charge,
      paramLink,
      page,
      adSize,
      isPublished,
      image,
    };
    const updateCategory = await slideAdSchema.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: "Update Unsuccessfull" });
  }
};


const getSingleSlideAd = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a route parameter
    const data = await slideAdSchema.findById(id); // Replace YourModel with your actual model

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




module.exports = {
  slideAdCreate,
  slideAdRead,
  slideAdUpdate,
  getSingleSlideAd
};
