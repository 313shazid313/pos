import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const returnSelectedProductSlice = createSlice({
  name: "returnselectedproducts",
  initialState: [],

  reducers: {
    // ! using setProducts to make returm sell
    setProducts: (state, action) => {
      return action.payload || [];
      // console.log(state.product)
    },

    addProduct: (state, action) => {
      // console.log(action.payload);
      const existingProduct = state.find(
        (product) => product.value === action.payload.value
      );

      if (existingProduct) {
        toast.error("Product already exists in the list");
        return;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    incrementProduct: (state, action) => {
      const product = state.find((product) => product.value === action.payload);
      if (product) {
        product.quantity++;
      }
    },

    decrementProduct: (state, action) => {
      const product = state.find((product) => product.value === action.payload);
      if (product && product.quantity > 0) {
        product.quantity--;
      }
    },

    removeProduct: (state, action) => {
      // console.log(action.payload);
      return state.filter((product) => product.value !== action.payload);
    },
  },
});

export const {
  addProduct,
  removeProduct,
  incrementProduct,
  decrementProduct,
  setProducts,
} = returnSelectedProductSlice.actions;
export default returnSelectedProductSlice.reducer;
