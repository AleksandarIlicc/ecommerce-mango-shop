import { createSlice } from "@reduxjs/toolkit";

const singleProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: true,
  },
  reducers: {
    singleProductSuccessRequest: (state, action) => {
      return { loading: true };
    },
    fetchSingleProduct: (state, action) => {
      return { loading: false, product: action.payload };
    },
    singleProductErrorRequest: (product, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const {
  singleProductSuccessRequest,
  fetchSingleProduct,
  singleProductErrorRequest,
} = singleProductSlice.actions;
export default singleProductSlice.reducer;
