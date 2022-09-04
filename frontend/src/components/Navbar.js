import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaOpencart,
  FaBars,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { logout } from "../features/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../features/cart/cartSlice";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const nav = useRef();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { productCart: productInCart } = cart;
  const { name: userName } = user.userInfo || "";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const navEl = nav.current;
      const navHeight = navEl.getBoundingClientRect().height;

      if (window.scrollY > navHeight) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    });
  });

  const handlerLogout = () => {
    dispatch(logout());
    dispatch(saveShippingAddress({}));
  };

  return (
    <nav className={stickyNav ? "nav nav--sticky" : "nav"} ref={nav}>
      <div className="nav__logo">
        <div
          className={stickyNav ? "background background--show" : "background"}
        ></div>
        <Link to="/">
          <span>Mango</span>Shop
        </Link>
      </div>
      <ul
        className={
          showNav
            ? "nav__list nav__list--active"
            : "nav__list" && stickyNav
            ? "nav__list nav__list--sticky"
            : "nav__list"
        }
      >
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/products">products</Link>
        </li>
        <li>
          <Link to="/about">about us</Link>
        </li>
      </ul>
      <div
        className={
          stickyNav ? "nav__icons-box nav__icons-box--sticky" : "nav__icons-box"
        }
      >
        <Link to="/cart" className="icon__cart">
          <FaOpencart />
          {productInCart.length > 0 && (
            <span className="product-badge">{productInCart.length}</span>
          )}
        </Link>
        {!user.isAuthenticated ? (
          <Link to="/signin" className="signin-link">
            sign in
          </Link>
        ) : (
          <div className="nav__user-name">
            <span>{userName}</span>
            <FaChevronDown />
            <div className="dropdown" onClick={() => handlerLogout()}>
              <span>logout</span>
              <FaSignOutAlt />
            </div>
          </div>
        )}
        <button className="icon__bars" onClick={() => setShowNav(!showNav)}>
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
