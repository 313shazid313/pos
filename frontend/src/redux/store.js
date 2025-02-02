import { configureStore } from "@reduxjs/toolkit";
import authApi from "./auth/authApi";
import authReducer from "../redux/auth/authSlice";
import brandApi from "./product-additional-state/brandApi";
import categoryApi from "./product-additional-state/categoryApi";
import unitApi from "./product-additional-state/unitApi";
import originApi from "./product-additional-state/originApi";
import typeApi from "./product-additional-state/typeApi";
import productApi from "./rtk/productApi";
import stockApi from "./additionals-state/stockApi";
import cartonApi from "./additionals-state/cartonApi";
import supplierApi from "./additionals-state/supplierApi";
import damageApi from "./additionals-state/damageApi";
import customerApi from "./additionals-state/customerApi";
import cartReducer from "./feature/sellCart";
import vatApi from "./additionals-state/vatApi";
import paymentTypeApi from "./additionals-state/paymentTypeApi";
import sellApi from "./additionals-state/sellApi";
import selectedProductReducer from "../redux/feature/slectedProductSlice";
import returnSelectedProductReducer from "../redux/feature/returnSelectedProductSlice";

// Defining root reducer here, combining all the reducers.
export const store = configureStore({
  reducer: {
    slectedproducts: selectedProductReducer,
    returnselectedproducts: returnSelectedProductReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [originApi.reducerPath]: originApi.reducer,
    [typeApi.reducerPath]: typeApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [cartonApi.reducerPath]: cartonApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [damageApi.reducerPath]: damageApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [vatApi.reducerPath]: vatApi.reducer,
    [paymentTypeApi.reducerPath]: paymentTypeApi.reducer,
    [sellApi.reducerPath]: sellApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      brandApi.middleware,
      categoryApi.middleware,
      originApi.middleware,
      typeApi.middleware,
      unitApi.middleware,
      productApi.middleware,
      stockApi.middleware,
      cartonApi.middleware,
      supplierApi.middleware,
      damageApi.middleware,
      customerApi.middleware,
      vatApi.middleware,
      paymentTypeApi.middleware,
      sellApi.middleware
    ),
});

export default store;
