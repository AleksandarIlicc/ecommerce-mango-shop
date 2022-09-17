import React, { useEffect } from "react";
import "./sass/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";
import ShippingPage from "./pages/ShippingPage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";
import Error404Page from "./pages/Error404Page";
import SingleProductPage from "./pages/SingleProductPage";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistory from "./pages/OrderHistory";

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
          <Route path="/search" element={<SearchPage />}></Route>
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
      </Router>
    </div>
  );
}

export default App;
