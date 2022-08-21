import React from "react";
import { Link } from "react-router-dom";
import { FaOpencart, FaBars, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <div className="background"></div>
        <Link to="/">
          <span>Mango</span>Shop
        </Link>
      </div>
      <ul className="nav__list ">
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
      <div className="nav__icons-container">
        <div className="search">
          <input type="text" placeholder="search" />
          <FiSearch className="icon__search" />
        </div>
        <div className="search-container ">
          <input type="text" placeholder="search" />
          <FiSearch className="icon__search icon__search--mobile" />
          <FaTimes className="icon__times" />
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

          <span className="product-badge">{0}</span>
        </Link>
        <button className="icon__bars">
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
