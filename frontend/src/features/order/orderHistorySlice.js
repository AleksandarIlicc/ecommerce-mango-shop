import { createSlice } from "@reduxjs/toolkit";

const orderHistorySlice = createSlice({
  name: "order-history",
  initialState: {
    orders: {},
    message: null,
    loading: null,
    success: null,
    error: null,
  },
  reducers: {
    orderHistoryRequest: (state, action) => {
      return { ...state, loading: true };
    },
    orderHistorySuccess: (state, action) => {
      const { orders, message } = action.payload;

      return {
        ...state,
        orders: orders,
        message: message,
        loading: false,
        success: true,
      };
    },
    orderHistoryFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    updateIsDelivered: (state, action) => {
      const { order } = action.payload;
      const { _id: orderID, isDelivered } = order;

      const updatedOrders = state.orders.map((order) =>
        order._id === orderID ? { ...order, isDelivered } : order
      );

      return { ...state, orders: updatedOrders };
    },
  },
});

export const {
  orderHistoryRequest,
  orderHistorySuccess,
  orderHistoryFail,
  updateIsDelivered,
} = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
