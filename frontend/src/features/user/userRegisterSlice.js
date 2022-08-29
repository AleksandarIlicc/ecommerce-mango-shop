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
    userLoaded: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    },
    userRegisterSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
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
    userError: (state, aciton) => {
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

export const { userLoaded, userRegisterSuccess, userRegisterFail, userError } =
  userRegisterSlice.actions;
export default userRegisterSlice.reducer;
