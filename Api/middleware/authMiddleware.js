const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	// Extract the token from cookies
	const token = req.cookies.token;

	if (!token) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'Authentication token not found' });
	}

	try {
		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const { username, userid } = decoded;

		// Attach user information to request object
		req.user = { username, userid };

		next();
	} catch (error) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'Not authorized, invalid token' });
	}
};

module.exports = authMiddleware;
