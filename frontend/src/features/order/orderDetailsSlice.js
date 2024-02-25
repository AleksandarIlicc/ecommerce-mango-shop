import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    loading: true,
    error: null,
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
    updateIsPaid: (state, action) => {
      const { isPaid } = action.payload;

      return {
        ...state,
        order: { ...state.order, isPaid: isPaid },
        loading: false,
      };
    },
  },
});

export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  updateIsPaid,
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
