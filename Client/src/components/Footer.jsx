import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "/images/evangadi-logo-footer.png";

const Footer = () => {
  return (
    <div className="bg-slate-700  sticky text-white">
      <div className="w-11/12 md:w-9/12 flex flex-col md:flex-row justify-between m-auto py-7">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="mb-4">
            <img src={logo} alt="Logo" />
          </div>
          <div className="flex space-x-4">
            <FaFacebook className="text-slate-100 size-7" />
            <FaInstagram className="text-slate-100 size-7" />
            <FaYoutube className="text-slate-100 size-7" />
          </div>
        </div>
        <div>
          <h3 className="text-xl text-slate-50 font-mono ">Useful Links</h3>
          <ul className="list-none text-slate-100 mt-4">
            <li>How it works</li>
            <li>Terms of service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl text-slate-50 font-mono ">Contact Info</h3>
          <ul className="list-none text-slate-100 mt-4">
            <li>Evangadi Networks</li>
            <li>support@evangaditech.com</li>
            <li>+251 904 400 385</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
