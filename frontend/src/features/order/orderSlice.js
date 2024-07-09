import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
  order: {},
  message: null,
  loading: true,
  success: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    orderRequest: (state) => {
      return { ...state, loading: true };
    },
    orderSuccess: (state, action) => {
      const { order, message } = action.payload;

      return {
        ...state,
        order,
        message,
        loading: false,
        success: true,
      };
    },
    orderFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    orderReset: (state) => {
      return { ...state, order: {}, loading: null, success: null, error: null };
    },
  },
});

export const { orderRequest, orderSuccess, orderFail, orderReset } =
  orderSlice.actions;
export default orderSlice.reducer;
