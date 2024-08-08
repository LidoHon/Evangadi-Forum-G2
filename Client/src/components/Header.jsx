import React, { useState } from 'react';
import logo from '../assets/evangadi-logo-black.png';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLink';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

	return (
    <div class="lg:min-w-[1350px] md:min-w-[800px] mx-auto">
      <header className="py-1 my-5 md:bg-orange-50 md:rounded md:shadow-sm lg:min-w-[1350px] md:min-w-[800px]">
        <div className="relative container p-6 flex flex-wrap">
          <div className="flex items-center justify-between w-full">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-10 md:h-8  hidden md:block"
              />
            </Link>
            <div className={`hidden md:flex justify-around pt-3 space-x-10`}>
              <NavLinks />
            </div>
            <div className={` md:hidden pt-3`}>
              <button onClick={toggleNavbar} aria-label="Toggle Navigation">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {isOpen && (
            <div
              className={` fixed top-0 left-0 w-full  bg-white shadow-lg flex flex-col items-center justify-center text-center space-y-4 transition-transform duration-300 ease-in-out`}
            >
              <button
                onClick={toggleNavbar}
                className="absolute top-4 right-4 text-gray-800 dark:text-white"
              >
                <X size={24} className="text-black" />
              </button>
              <NavLinks />
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
