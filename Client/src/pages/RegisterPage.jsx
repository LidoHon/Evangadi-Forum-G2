import React from 'react';
import Register from '../components/Register';
// import Paragraph from '../components/Paragraph';
import AboutPage from '../components/AboutPage/AboutPage';
const RegisterPage = () => {
	return (
		<div className="flex mx-auto">
			<Register />
			{/* <Paragraph /> */}
			<AboutPage />
		</div>
	);
};

export default RegisterPage;
