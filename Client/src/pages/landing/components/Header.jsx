import React from "react";
import logo from "../../../assets/evangadi-logo-black.png";
import classes from "../styles/header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="py-1 mt-8 mx-96 bg-orange-50 rounded shadow-sm ">
      <ul className="text-orange-800 max-w-92 flex text-center my-10 justify-center gap-7 align-middle">
       
          <Link to="/">
            <img src={logo} alt="Logo" className="w-28 mt-2" />
          </Link>
        
        <div className={classes.divider}></div>
          <Link to="/">Home</Link>
        
        
          <Link to="/how-it-works">How it works</Link>
        
        
          <Link
            to="/signup"
            className="bg-orange-800 text-white py-2 px-4 rounded"
            style={{ marginTop: "-5px" }}
          >
            Sign up
          </Link>
        
      </ul>
    </div>
  );
};

export default Header;
