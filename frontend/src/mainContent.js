import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/footer/footer.component";

// Pages
import HomePage from "./pages/home-page/home-page.component";
import AboutPage from "./pages/about-page/about-page.component";
import ProductsPage from "./pages/products-page/products-page.component";
import CartPage from "./pages/cart-page/cart-page.component";
import ShippingPage from "./pages/shipping-page/shipping-page.component";
import RegisterPage from "./pages/register-page/register-page.component";
import SigninPage from "./pages/sign-in-page/signin-page.component";
import SingleProductPage from "./pages/single-products-page/single-product-page";
import PaymentPage from "./pages/payment-page/payment-page.component";
import PlaceOrderPage from "./pages/place-order-page/place-order-page.component";
import OrderPage from "./pages/order-page/order-page.component";
import OrderHistory from "./pages/order-history-page/order-history-page.component";
import Dashboard from "./pages/dashboard/dashboard-page.component";
import Error404Page from "./pages/error-page/error-404-page.component";

const MainContent = ({ isAdmin }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/dashboard" && <Navbar />}
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
        {isAdmin ? (
          <Route exact path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<Error404Page />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default MainContent;
