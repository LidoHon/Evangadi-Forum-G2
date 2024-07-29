import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const [user, setUser] = useState({
		username: '',
		firstname: '',
		lastname: '',
		email: '',
	});
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get('/users/check'); // Fetch user data
				setUser({
					username: response.data.username,
					firstname: response.data.firstname,
					lastname: response.data.lastname,
					email: response.data.email,
				});
			} catch (err) {
				setError(err.message);
			}
		};

		fetchUserData();
	}, []);

	const handleEdit = () => {
		navigate('/update-profile'); // Navigate to the update profile page
	};

	if (error) return <p>Error: {error}</p>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Profile</h1>
			<div className="bg-white p-4 rounded-lg shadow-md">
				<div className="mb-4">
					<label className="block text-gray-700">Username</label>
					<p className="text-gray-900">{user.username}</p>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">First Name</label>
					<p className="text-gray-900">{user.firstname}</p>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Last Name</label>
					<p className="text-gray-900">{user.lastname}</p>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<p className="text-gray-900">{user.email}</p>
				</div>
				<button
					onClick={handleEdit}
					className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					Edit Profile
				</button>
			</div>
		</div>
	);
};

export default ProfilePage;
