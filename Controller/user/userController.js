const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dbConnection = require('../../Database/dbconfig');
const generateToken = require('../../utils/generateToken');

// Register a user
const register = async (req, res) => {
	const { username, firstname, lastname, email, password } = req.body;
	if (!email || !password || !firstname || !lastname || !username) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: 'please provide all required information ' });
	}
	try {
		const [user] = await dbConnection.query(
			'select username,userid from users where username = ? or email=?',
			[username, email]
		);

		// Regular expression for password validation
		// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const passwordRegex = /^.{8,}$/;
		if (user.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'user already registered!' });
		}

		if (!passwordRegex.test(password)) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'password must be greater than eight characters!' });
		}

		// Encrypting the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Insert user into the database
		const [result] = await dbConnection.query(
			'INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)',
			[username, firstname, lastname, email, hashedPassword]
		);

		// Use the generateToken function to set the token cookie
		generateToken(res, username, result.insertId);
		const userId = result.insertId;
		return res
			.status(StatusCodes.CREATED)
			.json({ msg: 'User account created successfully', userId });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'something went wrong. Try again' });
	}
};

// Login a user
const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: 'please provide all required fields' });
	}
	try {
		const [user] = await dbConnection.query(
			'select username , userid, password from users where email = ?',
			[email]
		);
		if (user.length === 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'invalid credentials' });
		}

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'invalid credentials' });
		}

		const username = user[0].username;
		const userid = user[0].userid;

		// Use the generateToken function to set the token cookie
		generateToken(res, username, userid);

		return res
			.status(StatusCodes.OK)
			.json({ msg: 'user login successful', username, userid });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'something went wrong. Try again' });
	}
};

// Logout user and clear the cookie
const logoutUser = (req, res) => {
	// Clear the token cookie
	res.cookie('token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 0, // Setting maxAge to 0 clears the cookie
	});
	return res
		.status(StatusCodes.OK)
		.json({ msg: 'User logged out successfully' });
};

// Get user
const checkUser = (req, res) => {
	const { username, userid } = req.user;
	res.status(StatusCodes.OK).json({ msg: 'valid user', username, userid });
};

// Update profile
const updateUser = async (req, res) => {
	// console.log('req body', req.body);
	const { userid, username, firstname, lastname, email, password } = req.body;
	// console.log('Received user ID:', userid);

	// Ensure the userid is provided
	if (!userid) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: 'User ID is required' });
	}

	try {
		// Check if user exists
		const [user] = await dbConnection.query(
			'SELECT userid FROM users WHERE userid = ?',
			[userid]
		);
		if (user.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
		}

		// Build the update query dynamically
		let updateQuery =
			'UPDATE users SET username = COALESCE(?, username), firstname = COALESCE(?, firstname), lastname = COALESCE(?, lastname), email = COALESCE(?, email)';
		const queryParams = [username, firstname, lastname, email];

		if (password) {
			if (password.length < 8) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: 'Password must be greater than eight characters!' });
			}
			// Encrypting the password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			updateQuery += ', password = ?';
			queryParams.push(hashedPassword);
		}

		updateQuery += ' WHERE userid = ?';
		queryParams.push(userid);

		// Execute the update query
		const [result] = await dbConnection.query(updateQuery, queryParams);

		// Check if the update was successful
		if (result.affectedRows === 0) {
			return res
				.status(StatusCodes.NOT_MODIFIED)
				.json({ msg: 'No changes made' });
		}

		return res.status(StatusCodes.OK).json({ msg: 'User account updated' });
	} catch (error) {
		console.error('Error updating user:', error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'Something went wrong. Try again' });
	}
};

module.exports = { register, login, logoutUser, checkUser, updateUser };
