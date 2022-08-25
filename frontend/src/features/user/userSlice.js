import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    userSigninRequest: (state, action) => {
      return { loading: true };
    },
    userSigninSuccess: (state, action) => {
      return { loading: false, userInfo: action.payload };
    },
    userSigninFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userSignout: (state, action) => {
      return {};
    },
  },
});

export const {
  userSigninRequest,
  userSigninSuccess,
  userSigninFail,
  userSignout,
} = userSlice.actions;
export default userSlice.reducer;
