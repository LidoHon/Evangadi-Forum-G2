import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const Register = () => {
	const navigate = useNavigate();
	const userNameDom = useRef(null);
	const firstNameDom = useRef(null);
	const lastNameDom = useRef(null);
	const emailDom = useRef(null);
	const passwordDom = useRef(null);

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
			alert('please provide all required informations');
			return;
		}
		try {
			await axios.post('/users/register', {
				username: userNameValue,
				firstname: firstNameValue,
				lastname: lastNameValue,
				email: emailValue,
				password: passwordValue,
			});
			alert('register sucessfull, please login');
			navigate('/login');
		} catch (error) {
			alert('something went wrong');
			console.log(error);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<span>Username:---</span>
					<input
						ref={userNameDom}
						type="text"
						name="username"
						placeholder="user name"
					/>
				</div>
				<div>
					<span>First Name:--</span>
					<input
						ref={firstNameDom}
						type="text"
						name="first_name"
						placeholder="first name"
					/>
				</div>
				<div>
					<span>Last Name:--</span>
					<input
						ref={lastNameDom}
						type="text"
						name="last_name"
						placeholder="last name"
					/>
				</div>
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
					<button type="submit">Register</button>
				</div>
			</form>
		</>
	);
};

export default Register;
