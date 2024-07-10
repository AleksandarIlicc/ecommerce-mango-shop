import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaBars, FaChevronDown } from "react-icons/fa";

import { logout } from "../../features/user/authSlice";

import "./dashboard-sidebar.style.scss";

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const [showNav, setShowNav] = useState(false);
  const [showSigninDropMenu, setShowSigninDropMenu] = useState(false);

  const user = useSelector((state) => state.user);
  const { name: userName } = user.userInfo || "";
  const userRole = user.userInfo?.role || "";

  const handlerLogout = () => {
    dispatch(logout());
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
  };

  return (
    <aside className="dashboard__sidebar">
      <div>{userName}</div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/products">products</Link>
        </li>
        <li>
          <Link to="/about">about us</Link>
        </li>
        {userRole === "admin" && (
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default React.memo(DashboardSidebar);
