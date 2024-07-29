import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the import according to your project structure
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UpdateProfile = () => {
	const [userId, setUserId] = useState('');
	const [username, setUsername] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		// Fetch user info or get userId from local storage or context
		const fetchUserData = async () => {
			try {
				// Example of getting userId from local storage (if stored there)
				const storedUserId = localStorage.getItem('userId');
				if (storedUserId) {
					setUserId(storedUserId);
					const response = await axios.get(`/users/check`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					});
					const userData = response.data;
					setUsername(userData.username);
					setFirstname(userData.firstname);
					setLastname(userData.lastname);
					setEmail(userData.email);
				} else {
					// Handle case where userId is not available
					console.error('User ID is not available');
				}
			} catch (err) {
				console.error('Failed to fetch user data', err);
			}
		};

		fetchUserData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await axios.put(
				'/users/check',
				{
					userid: userId,
					username,
					firstname,
					lastname,
					email,
					password,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			alert(response.data.msg);
		} catch (err) {
			setError(err.response?.data?.msg || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
			<h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
			{error && <p className="text-red-500 text-center mb-4">{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="User ID"
					className="w-full p-2 border border-gray-300 rounded-md mb-4"
					value={userId}
					readOnly
				/>
				<input
					type="text"
					placeholder="Username"
					className="w-full p-2 border border-gray-300 rounded-md mb-4"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder="First Name"
					className="w-full p-2 border border-gray-300 rounded-md mb-4"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Last Name"
					className="w-full p-2 border border-gray-300 rounded-md mb-4"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					className="w-full p-2 border border-gray-300 rounded-md mb-4"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className="relative mb-4">
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder="Password"
						className="w-full p-2 border border-gray-300 rounded-md"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div
						className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
						onClick={togglePasswordVisibility}
					>
						{showPassword ? (
							<FaEyeSlash className="text-gray-500" />
						) : (
							<FaEye className="text-gray-500" />
						)}
					</div>
				</div>
				<button
					type="submit"
					className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
					disabled={loading}
				>
					{loading ? 'Updating...' : 'Update Profile'}
				</button>
			</form>
		</div>
	);
};

export default UpdateProfile;
