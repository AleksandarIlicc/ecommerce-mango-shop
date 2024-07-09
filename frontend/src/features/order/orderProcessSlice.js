import { createSlice } from "@reduxjs/toolkit";

const initialOrderProcessState = {
  order: {},
  loading: false,
  success: false,
  error: null,
};

const orderProcessSlice = createSlice({
  name: "order-process",
  initialState: initialOrderProcessState,
  reducers: {
    orderProcessRequest: (state) => {
      return { ...state, loading: true };
    },
    orderProcessSuccess: (state, action) => {
      const { order } = action.payload;
      return { ...state, loading: false, success: true, order };
    },
    orderProcessFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    orderProcessReset: (state) => {
      return {
        ...state,
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
