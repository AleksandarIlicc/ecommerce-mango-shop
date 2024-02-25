import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    message: null,
    loading: true,
    success: null,
    error: null,
  },
  reducers: {
    orderRequest: (state, action) => {
      return { ...state, loading: true };
    },
    orderSuccess: (state, action) => {
      const { order, message } = action.payload;

      return {
        ...state,
        order: order,
        message: message,
        loading: false,
        success: true,
      };
    },
    orderFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    orderReset: (state, action) => {
      return { ...state, order: {}, loading: null, success: null, error: null };
    },
  },
});

export const { orderRequest, orderSuccess, orderFail, orderReset } =
  orderSlice.actions;
export default orderSlice.reducer;
