import React, { useEffect } from "react";
import "./sass/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home-page/HomePage";
import AboutPage from "./pages/about-page/AboutPage";
import ProductsPage from "./pages/products-page/ProductsPage";
import CartPage from "./pages/cart-page/CartPage";
import ShippingPage from "./pages/shipping-page/ShippingPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import SigninPage from "./pages/sign-in-page/SigninPage";
import Error404Page from "./pages/error-page/Error404Page";
import SingleProductPage from "./pages/single-products-page/SingleProductPage";
import setAuthToken from "./utils/setAuthToken";
import PaymentPage from "./pages/payment-page/PaymentPage";
import PlaceOrderPage from "./pages/place-order-page/PlaceOrderPage";
import OrderPage from "./pages/order-page/OrderPage";
import OrderHistory from "./pages/order-history-page/OrderHistory";
import Footer from "./components/Footer";
import { loadUser } from "./pages/register-page/RegisterPage";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/products" element={<ProductsPage />}></Route>
          <Route exact path="/about" element={<AboutPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route exact path="/signin" element={<SigninPage />}></Route>
          <Route exact path="/register" element={<RegisterPage />}></Route>
          <Route exact path="/shipping" element={<ShippingPage />}></Route>
          <Route exact path="/payment" element={<PaymentPage />}></Route>
          <Route exact path="/placeorder" element={<PlaceOrderPage />}></Route>
          <Route path="/order/:id" element={<OrderPage />}></Route>
          <Route path="/orderhistory" element={<OrderHistory />}></Route>
          <Route
            exact
            path="/api/products/:id"
            element={<SingleProductPage />}
          ></Route>
          <Route path="*" element={<Error404Page />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
