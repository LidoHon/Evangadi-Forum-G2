const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	// Extract the authorization header
	const authHeader = req.headers.authorization;

	// Check if the authorization header is present and has the 'Bearer ' prefix
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'invalid authentication' });
	}

	// Extract the token from the header
	const token = authHeader.split(' ')[1];
	console.log(authHeader);
	console.log(token);
	try {
		const [username, userid] = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { username, userid };
		next();
	} catch (error) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: 'authentication invalid' });
	}
};
module.exports = authMiddleware;
