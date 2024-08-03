import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="header-outer-wrapper">
      <div className="header-logo-container">
        <Link to="/">
          <img
            src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
            alt="Evangadi Logo"
          />
        </Link>
      </div>
      <div className="header-container">
        <ul>
          <li>Home</li>
          <li className="header-item" onClick={toggleDropdown}>
            <span>
              How it works
              {dropdownVisible && (
                <ul className="dropdown">
                  <li className="dropdown-item">Profile</li>
                  <li className="dropdown-item">Logout</li>
                </ul>
              )}
            </span>
          </li>
          <li className="login-css">Login</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
