import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    loading: true,
    error: null,
  },
  reducers: {
    customersRequest(state, action) {
      return { ...state, loading: true };
    },
    customersSuccess(state, action) {
      return { ...state, loading: false, customers: action.payload };
    },
    customersError(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { customersRequest, customersSuccess, customersError } =
  customerSlice.actions;
export default customerSlice.reducer;
