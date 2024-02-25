import { createSlice } from "@reduxjs/toolkit";

const singleProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: true,
  },
  reducers: {
    singleProductRequest: (state, action) => {
      return { loading: true };
    },
    singleProductSuccess: (state, action) => {
      return { loading: false, product: action.payload };
    },
    singleProductError: (product, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const {
  singleProductRequest,
  singleProductSuccess,
  singleProductErrorRequest,
} = singleProductSlice.actions;
export default singleProductSlice.reducer;
