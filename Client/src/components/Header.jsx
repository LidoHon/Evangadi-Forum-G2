import React, { useState } from 'react';
import logo from '../assets/evangadi-logo-black.png';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLink';
import { Link } from 'react-router-dom';
import classes from './header.module.css';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header
			className={`${classes.header} py-1 my-5 mx-0 md:mx-40 lg:mx-60 md:bg-orange-50 md:rounded md:shadow-sm`}
		>
			<div className="relative container mx-auto p-6 flex flex-wrap">
				<div className="flex items-center justify-between w-full">
					<Link to="/" className={classes.logo}>
						<img src={logo} alt="Logo" className="h-10 hidden md:block" />
					</Link>
					<div
						className={`${classes.navlinks} hidden md:flex justify-around pt-3 space-x-10`}
					>
						<NavLinks />
					</div>
					<div className={`${classes.mobileMenu} md:hidden pt-3`}>
						<button onClick={toggleNavbar} aria-label="Toggle Navigation">
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
				{isOpen && (
					<div
						className={`${classes.mobileNavlinks} fixed top-0 left-0 w-full  bg-white shadow-lg flex flex-col items-center justify-center text-center space-y-4 transition-transform duration-300 ease-in-out`}
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
	);
};

export default Header;
