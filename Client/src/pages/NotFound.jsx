import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<section className="flex flex-col justify-center items-center text-center ">
			<FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
			<h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
			<p className="text-xl mb-5">This page does not exist</p>
			<Link
				to="/questions"
				className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
			>
				Go Back
			</Link>
		</section>
	);
};

export default NotFound;
