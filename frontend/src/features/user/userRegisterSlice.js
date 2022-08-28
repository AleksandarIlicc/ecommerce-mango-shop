import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  reducers: {
    userRegisterRequest: (state, action) => {
      return { loading: true };
    },
    userRegisterSuccess: (state, action) => {
      localStorage.setItem("token");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload,
      };
    },
    userRegisterFail: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    },
  },
});

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } =
  userRegisterSlice.actions;
export default userRegisterSlice.reducer;
