import React, { useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';

const Register = () => {
	const navigate = useNavigate();
	const userNameDom = useRef(null);
	const firstNameDom = useRef(null);
	const lastNameDom = useRef(null);
	const emailDom = useRef(null);
	const passwordDom = useRef(null);

	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [generalError, setGeneralError] = useState('');

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userNameValue = userNameDom.current.value;
		const firstNameValue = firstNameDom.current.value;
		const lastNameValue = lastNameDom.current.value;
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		let validationErrors = {};
		if (!userNameValue) validationErrors.username = 'Username is required';
		if (!firstNameValue) validationErrors.firstname = 'First name is required';
		if (!lastNameValue) validationErrors.lastname = 'Last name is required';
		if (!emailValue) validationErrors.email = 'Email is required';
		if (!passwordValue) validationErrors.password = 'Password is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			const { data } = await axios.post('/users/register', {
				username: userNameValue,
				firstname: firstNameValue,
				lastname: lastNameValue,
				email: emailValue,
				password: passwordValue,
			});
			setGeneralError(''); // Clear any previous general errors
			navigate('/login');
		} catch (error) {
			setGeneralError('Something went wrong. Please try again.');
			console.log(error);
		}
	};

	return (
		<form
			className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-md space-y-6"
			onSubmit={handleSubmit}
		>
			<h2 className="text-2xl font-bold text-center mb-4">Join the Network</h2>
			<p className="text-sm text-center mb-6">
				Already have an account?{' '}
				<Link to="/login">
					<span className="text-blue-500 underline hover:text-blue-700">
						Sign in
					</span>
				</Link>
			</p>
			{generalError && (
				<p className="text-red-500 text-sm text-center mb-4">{generalError}</p>
			)}
			<div className="mb-4">
				<input
					ref={emailDom}
					type="email"
					name="email"
					placeholder="Email"
					className={`w-full p-2 border ${
						errors.email ? 'border-red-500' : 'border-gray-300'
					} rounded-md`}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm mt-1">{errors.email}</p>
				)}
			</div>
			<div className="flex space-x-4 mb-4">
				<div className="w-1/2">
					<input
						ref={firstNameDom}
						type="text"
						name="firstname"
						placeholder="First Name"
						className={`w-full p-2 border ${
							errors.firstname ? 'border-red-500' : 'border-gray-300'
						} rounded-md`}
					/>
					{errors.firstname && (
						<p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
					)}
				</div>
				<div className="w-1/2">
					<input
						ref={lastNameDom}
						type="text"
						name="lastname"
						placeholder="Last Name"
						className={`w-full p-2 border ${
							errors.lastname ? 'border-red-500' : 'border-gray-300'
						} rounded-md`}
					/>
					{errors.lastname && (
						<p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
					)}
				</div>
			</div>
			<div className="mb-4">
				<input
					ref={userNameDom}
					type="text"
					name="username"
					placeholder="Username"
					className={`w-full p-2 border ${
						errors.username ? 'border-red-500' : 'border-gray-300'
					} rounded-md`}
				/>
				{errors.username && (
					<p className="text-red-500 text-sm mt-1">{errors.username}</p>
				)}
			</div>
			<div className="relative mb-4">
				<input
					ref={passwordDom}
					type={showPassword ? 'text' : 'password'}
					name="password"
					placeholder="Password"
					className={`w-full p-2 border ${
						errors.password ? 'border-red-500' : 'border-gray-300'
					} rounded-md`}
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
				{errors.password && (
					<p className="text-red-500 text-sm mt-1">{errors.password}</p>
				)}
			</div>
			<button
				type="submit"
				className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
			>
				Register
			</button>
		</form>
	);
};

export default Register;
