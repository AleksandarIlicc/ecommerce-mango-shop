import { createSlice } from "@reduxjs/toolkit";

const orderProcessSlice = createSlice({
  name: "order-process",
  initialState: {
    order: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    orderProcessRequest: (state, action) => {
      return { loading: true };
    },
    orderProcessSuccess: (state, action) => {
      const { order } = action.payload;
      return { loading: false, success: true, order: order };
    },
    orderProcessFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    orderProcessReset: (state, action) => {
      return {
        order: {},
        loading: false,
        success: false,
        error: null,
      };
    },
  },
});

export const {
  orderProcessRequest,
  orderProcessSuccess,
  orderProcessFail,
  orderProcessReset,
} = orderProcessSlice.actions;
export default orderProcessSlice.reducer;
