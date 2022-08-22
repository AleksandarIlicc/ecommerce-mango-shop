import React from "react";
import "./sass/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Signin from "./pages/Signin";
import PageCart from "./pages/PageCart";
import PageError404 from "./pages/PageError404";
import Products from "./pages/Products";
import PageSingleProduct from "./pages/PageSingleProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route
            exact
            path="/api/products/:id"
            element={<PageSingleProduct />}
          ></Route>
          <Route path="/cart" element={<PageCart />}></Route>
          <Route path="*" element={<PageError404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
