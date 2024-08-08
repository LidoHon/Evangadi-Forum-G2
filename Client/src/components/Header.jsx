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
    <header className={`${classes.header} py-1 mt-5 mb-16`}>
      <div className="container mx-auto p-6 flex justify-between items-center">
        <Link to="/" className={classes.logo}>
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        <div className="hidden md:flex space-x-10">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar} aria-label="Toggle Navigation">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center text-center space-y-4">
          <button
            onClick={toggleNavbar}
            className="absolute top-4 right-4 text-gray-800"
          >
            <X size={24} className="text-black" />
          </button>
          <NavLinks />
        </div>
      )}
    </header>
  );
};

export default Header;
