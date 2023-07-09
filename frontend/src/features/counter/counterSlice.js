import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    incrementCount: (state, action) => {
      state.count += 1;
    },
    decrementCount: (state, action) => {
      if (state.count > 0) {
        state.count -= 1;
      } else {
        return;
      }
    },
  },
});

export const { incrementCount, decrementCount } = counterSlice.actions;
export default counterSlice.reducer;
