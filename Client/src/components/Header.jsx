import React, { useState } from "react";
import logo from "../assets/evangadi-logo-black.png";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLink";
import { Link } from "react-router-dom";
import classes from "./header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`${classes.header} py-1 my-5 mx-96 bg-orange-50 rounded shadow-sm`}
    >
      <div className="relative container mx-auto p-6">
        <div className="flex items-center justify-between">
          <Link to="/" className={classes.logo}>
            <img src={logo} alt="Logo" />
          </Link>
          <div
            className={`${classes.navlinks} hidden md:flex justify-around pt-3 space-x-10`}
          >
            <NavLinks />
          </div>
          <div className={`${classes.mobileMenu} md:hidden pt-3`}>
            <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {isOpen && (
          <div
            className={`${classes.mobileNavlinks} flex flex-col items-center md:hidden bg-background dark:bg-d-background`}
          >
            <NavLinks />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
