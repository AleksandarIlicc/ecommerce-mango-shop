import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
    orderSummaryInfo: {},
  },
  reducers: {
    addProductToCart: (state, action) => {
      const existProduct = state.cartItems.find(
        (product) => product._id === action.payload._id
      );
      if (existProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product._id === existProduct._id ? action.payload : product
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    },
    removeProductFromCart: (state, action) => {
      const newCart = state.cartItems.filter(
        (product) => product._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return { ...state, cartItems: [...newCart] };
    },
    saveShippingAddress: (state, action) => {
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return { ...state, shippingAddress: action.payload };
    },
    savePaymentMethod: (state, action) => {
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
      return { ...state, paymentMethod: action.payload };
    },
    saveOrderSummaryInfo: (state, action) => {
      return { ...state, orderSummaryInfo: action.payload };
    },
    cartEmpty: (state, action) => {
      return { ...state, error: "", cartItems: [] };
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  saveShippingAddress,
  savePaymentMethod,
  saveOrderSummaryInfo,
  cartEmpty,
} = cartSlice.actions;
export default cartSlice.reducer;
