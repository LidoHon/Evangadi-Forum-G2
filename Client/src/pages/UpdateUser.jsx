import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
	const [formData, setFormData] = useState({
		username: '',
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get('/api/users/check'); // Fetch user data
				setFormData({
					username: response.data.username || '',
					firstname: response.data.firstname || '',
					lastname: response.data.lastname || '',
					email: response.data.email || '',
					password: '', // Set initial password as empty string
				});
			} catch (err) {
				setError(err.message);
			}
		};

		fetchUserData();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put('/api/users/UpdateUser', formData);
			navigate('/profile');
		} catch (err) {
			setError(err.message);
		}
	};

	if (error) return <p>Error: {error}</p>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Update Profile</h1>
			<form
				onSubmit={handleSubmit}
				className="bg-white p-4 rounded-lg shadow-md"
			>
				<div className="mb-4">
					<label className="block text-gray-700">Username</label>
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">First Name</label>
					<input
						type="text"
						name="firstname"
						value={formData.firstname}
						onChange={handleChange}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Last Name</label>
					<input
						type="text"
						name="lastname"
						value={formData.lastname}
						onChange={handleChange}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default UpdateUser;
