import { createSlice } from "@reduxjs/toolkit";

const payOrderSlice = createSlice({
  name: "payorder",
  initialState: {},
  reducers: {
    payOrderRequest: (state, action) => {
      return { loading: true };
    },
    payOrderSuccess: (state, action) => {
      return { loading: false, success: true };
    },
    payOrderFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    payOrderReset: (state, action) => {
      return {};
    },
  },
});

export const { payOrderRequest, payOrderSuccess, payOrderFail, payOrderReset } =
  payOrderSlice.actions;
export default payOrderSlice.reducer;
