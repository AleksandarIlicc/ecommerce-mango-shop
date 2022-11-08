import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaOpencart, FaBars, FaChevronDown } from "react-icons/fa";
import { logout } from "../features/user/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const [showSigninDropMenu, setShowSigninDropMenu] = useState(false);
  const nav = useRef();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { productCart: productInCart } = cart;
  const { name: userName } = user.userInfo || "";

  useEffect(() => {
    const navEl = nav.current;
    const navHeight = navEl.getBoundingClientRect().height;

    window.addEventListener("scroll", () => {
      if (window.scrollY > navHeight) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    });
  });

  const handlerLogout = () => {
    dispatch(logout());
    localStorage.removeItem("productCart");
    localStorage.removeItem("shippingAddress");
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
        onClick={(e) =>
          setShowNav(() => {
            if (e.target.tagName === "A") {
              return false;
            } else {
              return true;
            }
          })
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
        <li className="signin">
          {!user.isAuthenticated ? (
            <Link to="/signin" className="signin__link">
              sign in
            </Link>
          ) : (
            <div className="nav__user-name">
              <span>{userName}</span>
              <FaChevronDown
                onClick={() => setShowSigninDropMenu(!showSigninDropMenu)}
              />
              <ul
                className={
                  showSigninDropMenu ? "dropdown dropdown--show" : "dropdown"
                }
              >
                <li
                  onClick={() => {
                    handlerLogout();
                    setShowSigninDropMenu(false);
                  }}
                >
                  logout
                </li>
                <Link to="/orderhistory">
                  <li>history</li>
                </Link>
              </ul>
            </div>
          )}
        </li>
      </ul>
      <div className={stickyNav ? "cart-box cart-box--sticky" : "cart-box"}>
        <Link to="/cart" className="icon__cart">
          <FaOpencart />
          {productInCart.length > 0 && (
            <span className="product-badge">{productInCart.length}</span>
          )}
        </Link>
      </div>
      <button
        className={stickyNav ? "btn__bars btn__bars--sticky" : "btn__bars"}
        onClick={() => setShowNav(!showNav)}
      >
        <FaBars />
      </button>
    </nav>
  );
};

export default Navbar;
