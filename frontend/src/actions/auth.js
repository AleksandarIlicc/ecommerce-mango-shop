import axios from "axios";
import {
  userError,
  userLoaded,
  userRegisterSuccess,
} from "../features/user/userRegisterSlice";
import { store } from "../store";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "../actions/setAlert";

export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    console.log(res);
    // store.dispatch(userLoaded(data));
  } catch (err) {
    store.dispatch(userError());
  }
};

export const register = async (name, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const { data } = await axios.post("/api/users", body, config);
    store.dispatch(userRegisterSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => setAlert(error.msg, "danger"));
    } else {
      return;
    }
  }
};