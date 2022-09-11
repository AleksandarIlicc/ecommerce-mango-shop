import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "order",
  initialState: {
    loading: true,
    order: {}
  },
  reducers: {
    orderDetailsRequest: (state, action) => {
      return { ...state, loading: true };
    },
    orderDetailsSuccess: (state, action) => {
      return { ...state, loading: false, order: action.payload };
    },
    orderDetailsFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } =
  orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
