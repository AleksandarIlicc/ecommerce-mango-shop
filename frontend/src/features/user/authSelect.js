import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state) => state.user;

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (user) => user.isAuthenticated
);

export const selectLoading = createSelector(
  [selectAuthState],
  (user) => user.loading
);

export const selectUserInfo = createSelector(
  [selectAuthState],
  (user) => user.userInfo
);

export const selectMessage = createSelector(
  [selectAuthState],
  (user) => user.message
);
