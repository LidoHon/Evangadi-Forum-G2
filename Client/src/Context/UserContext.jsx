import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axiosConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const fetchUser = async () => {
		try {
			const response = await axios.get('/users/check', {
				withCredentials: true,
			});
			setUser(response.data);
		} catch (error) {
			console.error(
				'Error fetching user data:',
				error.response?.data?.msg || error.message
			);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, fetchUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
