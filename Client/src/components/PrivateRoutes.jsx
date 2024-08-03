import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from '../axiosConfig';
import Spinner from './Spinner';

const PrivateRoute = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await axios.get('/users/check', { withCredentials: true });
				setIsAuthenticated(true);
			} catch (error) {
				console.error(
					'Not authenticated:',
					error.response?.data?.msg || error.message
				);
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	if (isAuthenticated === null) {
		return <Spinner />;
	}
	// if the user is not authenticated navigate back to login page..this way we can protect our routes
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
