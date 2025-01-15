const ProductModelSchema = require("../../model/product-model/productModel");

const productCreate = async (req, res, next) => {
  try {
    const {
      name,
      Specification,
      description,
      price,
      buyingPrice,
      isPublished,
      sellType,
      categoryId,
      typeId,
      originId,
      brandId,
      unitId,
      preOrder,
      cartonId,
      mrpPrice,
      tradePrice,
    } = req.body;

    //==========>
    const productExist = await ProductModelSchema.exists({ name: name });

    if (productExist) {
      return res.json(401, { message: "Product with this name already exist" });
    }
    //==========>

    const savedProduct = await ProductModelSchema.create({
      name,
      Specification,
      description,
      price,
      buyingPrice,
      isPublished,
      sellType,
      categoryId,
      typeId,
      originId,
      brandId,
      unitId,
      preOrder,
      cartonId,
      mrpPrice,
      tradePrice,
    });

    return res.status(200).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const showAll = await ProductModelSchema.find()
      .populate("categoryId")
      .populate("typeId")
      .populate("originId")
      .populate("brandId")
      .populate("unitId")
      .populate("cartonId")
      .sort({ _id: -1 });

    return res.status(200).json(showAll);
  } catch (error) {
    next(error);
  }
};

const getASingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const singleProduct = await ProductModelSchema.findById(id)
      .populate("categoryId")
      .populate("typeId")
      .populate("originId")
      .populate("brandId")
      .populate("unitId")
      .populate("cartonId");

    if (!singleProduct) {
      res.statusCode = 404;
      throw new Error("Product not found!");
    }
    res.status(200).json(singleProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      Specification,
      description,
      price,
      buyingPrice,
      isPublished,
      sellType,
      categoryId,
      typeId,
      originId,
      brandId,
      unitId,
      preOrder,
      cartonId,
      mrpPrice,
      tradePrice,
    } = req.body;

    console.log("Request Body:", req.body);
    console.log(name);
    const { id } = req.params;

    const updateData = {
      name,
      Specification,
      description,
      price,
      buyingPrice,
      isPublished,
      sellType,
      categoryId,
      typeId,
      originId,
      brandId,
      unitId,
      preOrder,
      cartonId,
      mrpPrice,
      tradePrice,
    };

    console.log(id);

    const updatedProduct = await ProductModelSchema.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    ).populate("category");

    if (!updatedProduct) {
      throw new Error("Product not found!");
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const searchedData = await ProductModelSchema.find({
      $or: [{ name: { $regex: req.query.query, $options: "i" } }],
    });
    res.status(200).json(searchedData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productCreate,
  getProducts,
  getASingleProduct,
  updateProduct,
  searchProducts,
};
