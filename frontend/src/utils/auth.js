import { authError, userLoaded } from "../features/user/authSlice";
import { store } from "../store";
import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const { data } = await axios.get("/api/auth");
    store.dispatch(userLoaded(data.user));
  } catch (err) {
    store.dispatch(authError());
  }
};
