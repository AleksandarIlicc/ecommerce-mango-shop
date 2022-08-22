import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaOpencart, FaBars, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const nav = useRef();
  const cart = useSelector((state) => state.cart);
  const { productCart: productInCart } = cart;

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
        <li>
          <Link to="/signin">sign in</Link>
        </li>
      </ul>
      <div
        className={
          stickyNav
            ? "nav__icons-container nav__icons-container--sticky"
            : "nav__icons-container"
        }
      >
        <div className="search">
          <input type="text" placeholder="search" />
          <FiSearch
            className="icon__search"
            onClick={() => setShowSearch(true)}
          />
        </div>
        <div
          className={
            showSearch
              ? "search-container search-container--active"
              : "search-container"
          }
        >
          <input type="text" placeholder="search" />
          <FiSearch className="icon__search icon__search--mobile" />
          <FaTimes
            className="icon__times"
            onClick={() => setShowSearch(false)}
          />
          <div className="search-container__box mt-small">
            <h2>Popular Search Terms</h2>
            <ul>
              <li>Shoes</li>
              <li>T-shirt</li>
              <li>Nike Cap</li>
              <li>Adidas Jacket</li>
            </ul>
          </div>
        </div>
        <Link to="/cart" className="icon__cart">
          <FaOpencart />
          {productInCart.length > 0 && (
            <span className="product-badge">{productInCart.length}</span>
          )}
        </Link>
        <button className="icon__bars" onClick={() => setShowNav(!showNav)}>
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
