import { createSlice } from "@reduxjs/toolkit";

const formAlertSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addAlert: (state, action) => {
      return [...state, action.payload];
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { addAlert, removeAlert } = formAlertSlice.actions;
export default formAlertSlice.reducer;
