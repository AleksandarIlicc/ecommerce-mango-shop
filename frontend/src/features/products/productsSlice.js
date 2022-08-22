import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    productsSuccessRequest: (state, action) => {
      return { loading: true };
    },
    fetchProducts: (state, action) => {
      return { loading: false, products: action.payload };
    },
    productsErrorRequest: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const { productsSuccessRequest, fetchProducts, productsErrorRequest } =
  productsSlice.actions;
export default productsSlice.reducer;
