import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productsSlice";
import singleProductReducer from "./features/products/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";
import counterReducer from "./features/counter/counterSlice";
// import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,
    counter: counterReducer,
    // user: userReducer,
  },
});
