import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { deliverOrder, fetchUserOrders } from "./orderHistoryThunks";

const initialOrderHistoryState = {
  orders: [],
  message: null,
  loading: null,
  success: null,
  error: null,
};

const orderHistorySlice = createSlice({
  name: "order-history",
  initialState: initialOrderHistoryState,
  reducers: {
    updateIsDelivered: (state, action) => {
      const { order } = action.payload;
      const { _id: orderID, isDelivered } = order;

      const updatedOrders = state.orders.map((order) =>
        order._id === orderID ? { ...order, isDelivered } : order
      );

      return { ...state, orders: updatedOrders };
    },
    resetMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        const { orders, message } = action.payload;
        return {
          ...state,
          orders,
          message,
          loading: false,
          success: true,
        };
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        const { _id: orderID, isDelivered } = order;

        const updatedOrders = state.orders.map((order) =>
          order._id === orderID ? { ...order, isDelivered } : order
        );

        return { ...state, loading: false, orders: updatedOrders };
      })
      .addMatcher(isPending(fetchUserOrders, deliverOrder), (state) => {
        return { ...state, loading: true, error: null };
      })
      .addMatcher(
        isRejected(fetchUserOrders, deliverOrder),
        (state, action) => {
          return { ...state, loading: false, error: action.payload };
        }
      );
  },
});

export const { updateIsDelivered, resetMessage } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
