import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productsSlice";
import singleProductReducer from "./features/products/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";
import counterReducer from "./features/counter/counterSlice";
import userRegisterReducer from "./features/user/userRegisterSlice";
import formAlertReducer from "./features/formAlert/formAlertSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,
    counter: counterReducer,
    user: userRegisterReducer,
    formAlert: formAlertReducer,
  },
});
