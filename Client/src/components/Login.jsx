import React, { useState } from 'react';
import { useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { useUser } from '../Context/UserContext';

const Login = () => {
	const { setUsername } = useUser();
	const navigate = useNavigate();
	const emailDom = useRef(null);
	const passwordDom = useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [generalError, setGeneralError] = useState('');

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		let validationErrors = {};
		if (!emailValue) validationErrors.email = 'Email is required';
		if (!passwordValue) validationErrors.password = 'Password is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			const { data } = await axios.post('/users/login', {
				email: emailValue,
				password: passwordValue,
			});
			// console.log(data);
			setGeneralError(''); // Clear any previous general errors
			localStorage.setItem('token', data.token);
			setUsername(data.username);
			navigate('/questions');
			// console.log(data);
		} catch (error) {
			setGeneralError(
				error.response?.data.msg || 'Something went wrong. Please try again.'
			);
			console.log(error.response.data);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-md space-y-6 my-10"
			>
				<h2 className="text-2xl text-center font-bold mb-4">
					Login to Your Account
				</h2>
				<p className="text-sm text-center mb-6">
					Don't have an account?{' '}
					<Link to="/register">
						<span className="text-orange-800 no-underline hover:text-orange-700 hover:underline">
							Sign Up
						</span>
					</Link>
				</p>
				{generalError && (
					<p className="text-red-500 text-sm text-center mb-4">
						{generalError}
					</p>
				)}
				<div className="mb-4">
					<input
						ref={emailDom}
						type="email"
						name="email"
						placeholder="Enter Email"
						className={`w-full p-2 border ${
							errors.email ? 'border-red-500' : 'border-gray-300'
						} rounded-md`}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email}</p>
					)}
				</div>
				<div className="relative mb-4">
					<input
						ref={passwordDom}
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Enter Password"
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
					className="w-full p-2 bg-orange-800 text-white rounded-md hover:bg-orange-700"
				>
					Login
				</button>
				<p className="text-center">or</p>
				<Link to="/register">
					<p className="text-orange-800  mt-6 no-underline text-center hover:text-orange-700">
						Create an Account
					</p>
				</Link>
			</form>
		</>
	);
};

export default Login;
