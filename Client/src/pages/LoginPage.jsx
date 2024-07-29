import React from 'react';
import Login from '../components/Login';
import Paragraph from '../components/Paragraph';

const LoginPage = () => {
	return (
		<div className="flex flex-row">
			<Login />
			<Paragraph />
		</div>
	);
};

export default LoginPage;
