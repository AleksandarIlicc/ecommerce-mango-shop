import { v4 as uuidv4 } from "uuid";
import { addAlert, removeAlert } from "../features/formAlert/formAlertSlice";
import { store } from "../store";

export const setAlert = (message, alertType, timeout = 5000) => {
  const id = uuidv4();
  store.dispatch(addAlert({ message, alertType, id }));
  setTimeout(() => {
    store.dispatch(removeAlert(id));
  }, timeout);
};
