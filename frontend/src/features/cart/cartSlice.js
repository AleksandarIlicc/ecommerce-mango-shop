import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCart: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      const existProduct = state.productCart.find(
        (product) => product._id === action.payload._id
      );

      if (existProduct) {
        return {
          ...state,
          productCart: state.productCart.map((product) =>
            product._id === existProduct._id ? action.payload : product
          ),
        };
      } else {
        return {
          ...state,
          productCart: [...state.productCart, action.payload],
        };
      }
    },
    removeProductFromCart: (state, action) => {
      const newCart = state.productCart.filter(
        (product) => product._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return { productCart: [...newCart] };
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
