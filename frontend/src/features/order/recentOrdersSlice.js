import { createSlice } from "@reduxjs/toolkit";

const recentOrdersSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: true,
    error: null,
  },
  reducers: {
    recentOrdersRequest: (state, action) => {
      return { ...state, loading: true };
    },
    recentOrdersSuccess: (state, action) => {
      const { orders, message } = action.payload;

      return { ...state, loading: false, orders: orders, error: message };
    },
    recentOrdersFail: (state, action) => {
      const { message } = action.payload;

      return { ...state, loading: false, error: message };
    },
    updateIsShipped: (state, action) => {
      const { _id: orderID, isShipped } = action.payload.order;

      const updatedOrder = state.orders.map((order) =>
        order._id === orderID ? { ...order, isShipped } : order
      );

      return { ...state, orders: updatedOrder };
    },
  },
});

export const {
  recentOrdersRequest,
  recentOrdersSuccess,
  recentOrdersFail,
  updateIsShipped,
} = recentOrdersSlice.actions;
export default recentOrdersSlice.reducer;
