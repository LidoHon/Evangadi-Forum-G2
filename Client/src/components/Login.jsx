import React, { useState } from 'react';
import { useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';
const Login = () => {
	const navigate = useNavigate();
	const emailDom = useRef(null);
	const passwordDom = useRef(null);
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		if (!emailValue || !passwordValue) {
			alert('please provide all required informations');
			return;
		}
		try {
			const { data } = await axios.post('/users/login', {
				email: emailValue,
				password: passwordValue,
			});
			alert('login sucessfull');
			localStorage.setItem('token', data.token);
			navigate('/');
			console.log(data);
		} catch (error) {
			alert(error.response?.data.msg);
			console.log(error.response.data);
		}
	};
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-md space-y-6"
			>
				<h2 className="text-2xl text-center font-bold mb-4">
					Login to Your Account
				</h2>
				<p className="text-sm text-center mb-6">
					Don't have an account?{' '}
					<Link to="/register">
						<span className="text-orange-400 underline hover:text-orange-600">
							Sign Up
						</span>
					</Link>
				</p>
				<input
					ref={emailDom}
					type="email"
					name="email"
					placeholder="Enter Email"
					className="w-full p-2 border border-gray-300 rounded-md mb-4"
				/>
				<div className="relative mb-4">
					<input
						ref={passwordDom}
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Enter Password"
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
					className="w-full p-2 bg-orange-400 text-white rounded-md hover:bg-orange-600"
				>
					Submit
				</button>
				<Link to="/register">
					<p className="text-orange-400 underline text-center hover:text-orange-600">
						Create an Account
					</p>
				</Link>
			</form>
		</>
	);
};

export default Login;
