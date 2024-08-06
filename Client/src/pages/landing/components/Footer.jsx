import React from "react";
import logo from "../../../assets/evangadi-logo-white.png";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaYoutube,
} from "react-icons/fa6";
const Footer = () => {
  return (
    <section className="px-20 py-10 bg-gray-600 flex justify-between">
      <div>
        <img src={logo} alt="" />
        <div className="flex py-5 gap-4">
          <FaSquareFacebook className="text-slate-100 size-7" />
          <FaSquareInstagram className="text-slate-100 size-7" />
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
    </section>
  );
};

export default Footer;
