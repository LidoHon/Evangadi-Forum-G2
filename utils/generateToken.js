const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Function to generate token and set it in a cookie
const generateToken = (res, username, userid) => {
	const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Set the token as a cookie
	res.cookie('token', token, {
		httpOnly: true, // Prevents client-side access to the cookie
		secure: process.env.NODE_ENV === true, // Set to true if using https..since we r not using https while in development
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiry in milliseconds
	});
};

module.exports = generateToken;
