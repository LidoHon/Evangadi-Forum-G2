import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
const Login = () => {
	const navigate = useNavigate();
	const emailDom = useRef(null);
	const passwordDom = useRef(null);

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
			<form onSubmit={handleSubmit}>
				<div>
					<span>email:--</span>
					<input
						ref={emailDom}
						type="email"
						name="last_name"
						placeholder="email"
					/>
				</div>
				<div>
					<span>Password:--</span>
					<input
						ref={passwordDom}
						type="password"
						name="password"
						placeholder="password"
					/>
				</div>
				<div>
					<button type="submit">Login</button>
				</div>
			</form>
		</>
	);
};

export default Login;
