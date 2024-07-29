import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
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

		fetchUser();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Profile</h1>
			<p>Username: {user.username}</p>
			<p>First Name: {user.firstname}</p>
			<p>Last Name: {user.lastname}</p>
			<p>Email: {user.email}</p>
			<button onClick={handleLogout}>Logout</button>
			<a href="/update-profile"> update profile</a>
		</div>
	);
};

export default ProfilePage;
