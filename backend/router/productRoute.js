const express = require("express");
const productRouter = express.Router();

const {
  productCreate,
  getProducts,
  getASingleProduct,
  updateProduct,
  searchProducts
} = require("../controller/product-controller/product-controller");

const {
  categoryFuncCreate,
  categoruFuncRead,
  categoryFuncUpdate,
  getSingleCategory,
} = require("../controller/product-controller/product-additionals-conteroller/category-controller");

const {
  brandCreate,
  brandRead,
  brandUpdate,
  getSingleBrand,
} = require("../controller/product-controller/product-additionals-conteroller/brand-controller");

const {
  originCreate,
  originRead,
  originUpdate,
  getSingleOrigin,
} = require("../controller/product-controller/product-additionals-conteroller/origin-controller");

const {
  typeCreate,
  typeRead,
  typeUpdate,
  getSingleType,
} = require("../controller/product-controller/product-additionals-conteroller/type-controller");

const {
  unitCreate,
  unitRead,
  unitUpdate,
  getSingleUnit,
} = require("../controller/product-controller/product-additionals-conteroller/unit-controller");

//? if i make a post request and use middleware
//? its patch/put request wont work if i didnt use that middleware
//? i should be careful

//! product route
productRouter.route("/create-category").post(categoryFuncCreate);
productRouter.route("/all-categories").get(categoruFuncRead);
productRouter.route("/update-category/:id").put(categoryFuncUpdate);
productRouter.route("/single-category/:id").get(getSingleCategory);

productRouter.route("/create-brand").post(brandCreate);
productRouter.route("/all-brands").get(brandRead);
productRouter.route("/update-brand/:id").put(brandUpdate);
productRouter.route("/single-brand/:id").get(getSingleBrand);

productRouter.route("/create-origin").post(originCreate);
productRouter.route("/all-origins").get(originRead);
productRouter.route("/update-origin/:id").put(originUpdate);
productRouter.route("/single-origin/:id").get(getSingleOrigin);

productRouter.route("/create-type").post(typeCreate);
productRouter.route("/all-types").get(typeRead);
productRouter.route("/update-type/:id").put(typeUpdate);
productRouter.route("/single-type/:id").get(getSingleType);

productRouter.route("/create-unit").post(unitCreate);
productRouter.route("/all-units").get(unitRead);
productRouter.route("/single-unit/:id").get(getSingleUnit);
productRouter.route("/update-unit/:id").put(unitUpdate);

productRouter.route("/create-product").post(productCreate);
productRouter.route("/all-products").get(getProducts);
productRouter.route("/update-product/:id").put(updateProduct);
productRouter.route("/single-product/:id").get(getASingleProduct);
productRouter.route("/search").get(searchProducts)


module.exports = productRouter;
