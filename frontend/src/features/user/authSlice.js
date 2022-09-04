import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    userInfo: null,
  },
  reducers: {
    userLoaded: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload,
      };
    },
    userRegisterSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    userLoginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
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
        userInfo: null,
      };
    },
    userLoginFail: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        userInfo: null,
      };
    },
    authError: (state, aciton) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        userInfo: null,
      };
    },
    logout: (state, aciton) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        userInfo: null,
      };
    },
  },
});

export const {
  userLoaded,
  userRegisterSuccess,
  userLoginSuccess,
  userRegisterFail,
  userLoginFail,
  authError,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
