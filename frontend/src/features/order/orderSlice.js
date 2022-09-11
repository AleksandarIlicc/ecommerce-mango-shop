import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    orderRequest: (state, action) => {
      return { ...state, loading: true };
    },
    orderSuccess: (state, action) => {
      return { ...state, loading: false, success: true, order: action.payload };
    },
    orderFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    orderReset: (state, action) => {
      return {};
    },
  },
});

export const { orderRequest, orderSuccess, orderFail, orderReset } =
  orderSlice.actions;
export default orderSlice.reducer;
