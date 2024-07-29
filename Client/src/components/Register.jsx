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

		if (
			!userNameValue ||
			!firstNameValue ||
			!lastNameValue ||
			!emailValue ||
			!passwordValue
		) {
			alert('Please provide all required information');
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
			alert('Registration successful, please login');

			// Store user ID in local storage
			localStorage.setItem('userId', data.userId);

			navigate('/login');
		} catch (error) {
			alert('Something went wrong');
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
			<input
				ref={emailDom}
				type="email"
				name="email"
				placeholder="Email"
				className="w-full p-2 border border-gray-300 rounded-md mb-4"
			/>
			<div className="flex space-x-4 mb-4">
				<input
					ref={firstNameDom}
					type="text"
					name="firstname"
					placeholder="First Name"
					className="w-1/2 p-2 border border-gray-300 rounded-md"
				/>
				<input
					ref={lastNameDom}
					type="text"
					name="lastname"
					placeholder="Last Name"
					className="w-1/2 p-2 border border-gray-300 rounded-md"
				/>
			</div>
			<input
				ref={userNameDom}
				type="text"
				name="username"
				placeholder="Username"
				className="w-full p-2 border border-gray-300 rounded-md mb-4"
			/>
			<div className="relative mb-4">
				<input
					ref={passwordDom}
					type={showPassword ? 'text' : 'password'}
					name="password"
					placeholder="Password"
					className="w-full p-2 border border-gray-300 rounded-md"
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
			>
				Agree and Join
			</button>
			
			<p className="text-sm text-center mb-6">
				I agree to the privacy policy and terms of service{' '}
				<Link to="/login">
					<span className="text-blue-500 underline hover:text-blue-700">
						Already have an account?
					</span>
				</Link>
			</p>
		</form>
	);
};

export default Register;
