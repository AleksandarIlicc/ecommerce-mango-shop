import { createSlice } from "@reduxjs/toolkit";

const filterButtonSlice = createSlice({
  name: "filerButton",
  initialState: {
    toggleFilters: false,
  },
  reducers: {
    showFilters: (state, action) => {
      return { ...state, toggleFilters: true };
    },
    hideFilters: (state, action) => {
      return { ...state, toggleFilters: false };
    },
  },
});

export const { showFilters, hideFilters } = filterButtonSlice.actions;
export default filterButtonSlice.reducer;
