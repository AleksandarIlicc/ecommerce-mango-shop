import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCart: localStorage.getItem("productCart")
      ? JSON.parse(localStorage.getItem("productCart"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
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
      localStorage.setItem("productCart", JSON.stringify(newCart));
      return { productCart: [...newCart] };
    },
    saveShippingAddress: (state, action) => {
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return { ...state, shippingAddress: action.payload };
    },
    savePaymentMethod: (state, action) => {
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
      return { ...state, paymentMethod: action.payload };
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
