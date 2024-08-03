import React from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer-outer-wrapper">
      <div className="footer-media">
        <ul>
          <li>
            <Link to="/">
              <img
                className="evan-logo-footer"
                src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-white.png"
                alt="Evangadi Logo"
              />
            </Link>
          </li>
          <li className="social-media">
            <ul>
              <Link to="https://www.facebook.com/evangaditech">
                <li>
                  <IoLogoFacebook />
                </li>
              </Link>

              <li>
                <Link to="https://www.instagram.com/evangaditech/">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to="https://www.youtube.com/@EvangadiTech">
                  <CiYoutube />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="footer-usfulLink">
        <h1></h1>
        <ul>
          
            <h4>Useful Links</h4>
          
          <li>How it works</li>
          <li>Terms and Service</li>
          <li>Privacy and Policy</li>
        </ul>
      </div>
      <div className="footer-contactInfo">
        <ul>
          
            <h4>Contact Info</h4>
          
          <li>Evangadi Networks</li>
          <li>support@gmail.com</li>
          <li>+1-202-386-2702</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
