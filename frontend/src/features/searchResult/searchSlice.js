import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchResult",
  initialState: {
    loading: true,
    products: [],
    error: "",
  },
  reducers: {
    searchRequest: (state, action) => {
      return { ...state, loading: true };
    },
    searchSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    },
    searchFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { searchRequest, searchSuccess, searchFail } = searchSlice.actions;
export default searchSlice.reducer;
