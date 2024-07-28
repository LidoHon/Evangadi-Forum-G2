import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const NotFound = () => {
	return (
		<section
			className="d-flex flex-column justify-content-center align-items-center text-center"
			style={{ height: '40rem' }}
		>
			<FaExclamationTriangle className="text-warning display-1 mb-4" />
			<h1 className="display-1 fw-bold mb-4">404 Not Found</h1>
			<p className="fs-4 mb-5">
				This page does not exist
				<br />
			</p>
			<Link to="/" className="btn btn-primary mt-4">
				Go Back
			</Link>
		</section>
	);
};

export default NotFound;
