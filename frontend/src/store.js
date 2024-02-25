import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productsSlice";
import singleProductReducer from "./features/products/singleProductSlice";
import cartReducer from "./features/cart/cartSlice";
import counterReducer from "./features/counter/counterSlice";
import authReducer from "./features/user/authSlice";
import orderReducer from "./features/order/orderSlice";
import orderDetailsReducer from "./features/order/orderDetailsSlice";
import orderHistoryReducer from "./features/order/orderHistorySlice";
import orderProcessReducer from "./features/order/orderProcessSlice";
import recentOrdersReducer from "./features/order/recentOrdersSlice";
import filterButtonReducer from "./features/buttons/filterButton";
import commentsReducer from "./features/comments/commentSlice";
import customerReducer from "./features/customers/customerSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,
    counter: counterReducer,
    user: authReducer,
    orderDetails: orderDetailsReducer,
    orderHistory: orderHistoryReducer,
    order: orderReducer,
    orderProcess: orderProcessReducer,
    recentOrders: recentOrdersReducer,
    filterButton: filterButtonReducer,
    comments: commentsReducer,
    customers: customerReducer,
  },
});
