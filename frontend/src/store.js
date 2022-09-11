import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productsSlice";
import singleProductReducer from "./features/products/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";
import counterReducer from "./features/counter/counterSlice";
import authReducer from "./features/user/authSlice";
import formAlertReducer from "./features/formAlert/formAlertSlice";
import orderReducer from "./features/order/orderSlice";
import orderDetailsReducer from "./features/order/orderDetailsSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,
    counter: counterReducer,
    user: authReducer,
    formAlert: formAlertReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
  },
});
