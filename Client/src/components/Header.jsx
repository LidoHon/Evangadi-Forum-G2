import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";
import Login from "./Login";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // to login route handller function
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".login-container")) {
        setFormVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevent triggering the document click handler
    setFormVisible(true);
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

          <li className="">
            <div>
              <button className="login-css" onClick={handleButtonClick}>
                Login
              </button>
              {formVisible && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Login />
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
