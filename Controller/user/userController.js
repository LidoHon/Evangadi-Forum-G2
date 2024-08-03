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
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

// update a user
async function updateProfile(req, res) {
	const userId = req.user.userid;
	const {
		username,
		firstname,
		lastname,
		email,
		currentPassword,
		newPassword,
		retypeNewPassword,
	} = req.body;

	try {
		const updateFields = [];
		const values = [];
		let query = 'UPDATE users SET ';

		// Check and add username to update query if provided
		if (username) {
			const [usernameExists] = await dbConnection.query(
				'SELECT * FROM users WHERE username = ? AND userid != ?',
				[username, userId]
			);
			if (usernameExists.length > 0) {
				return res.status(409).json({ msg: 'Username already exists' });
			}
			updateFields.push('username = ?');
			values.push(username);
		}

		// Check and add email to update query if provided
		if (email) {
			const [emailExists] = await dbConnection.query(
				'SELECT * FROM users WHERE email = ? AND userid != ?',
				[email, userId]
			);
			if (emailExists.length > 0) {
				return res.status(409).json({ msg: 'Email already exists' });
			}
			updateFields.push('email = ?');
			values.push(email);
		}

		// Add firstname and lastname to update query if provided
		if (firstname) {
			updateFields.push('firstname = ?');
			values.push(firstname);
		}

		if (lastname) {
			updateFields.push('lastname = ?');
			values.push(lastname);
		}

		//Handles the password change only if the user provided a password on any of the 3 password fields

		if (currentPassword || newPassword || retypeNewPassword) {
			// Ensuring all three password fields are provided
			if (!currentPassword || !newPassword || !retypeNewPassword) {
				return res
					.status(400)
					.json({
						msg: 'To change the password, provide current password, new password, and retype new password',
					});
			}

			// Validate the new password length
			if (newPassword.length <= 8) {
				return res
					.status(400)
					.json({ msg: 'New password must be longer than 8 characters' });
			}

			// Ensure the new password and retype new password match
			if (newPassword !== retypeNewPassword) {
				return res
					.status(400)
					.json({ msg: 'New password and retype new password do not match' });
			}

			// Verify the current password
			const [user] = await dbConnection.query(
				'SELECT password FROM users WHERE userid = ?',
				[userId]
			);

			if (!user || user.length === 0) {
				return res.status(404).json({ msg: 'User not found' });
			}

			const storedPasswordHash = user[0].password;

			// Checking if password exists
			if (!storedPasswordHash) {
				return res.status(500).json({ msg: 'Stored password not found' });
			}

			const validPassword = await bcrypt.compare(
				currentPassword,
				storedPasswordHash
			);
			if (!validPassword) {
				return res.status(400).json({ msg: 'Current password is incorrect' });
			}

			// Encrypting the new password
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(newPassword, salt);
			updateFields.push('password = ?');
			values.push(hashPassword);
		}

		// Finalized the update query
		query += updateFields.join(', ') + ' WHERE userid = ?';
		values.push(userId);

		// Executed the update query
		await dbConnection.query(query, values);

		return res.status(200).json({ msg: 'Profile updated successfully' });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ msg: 'An error occurred while updating the profile' });
	}
}

module.exports = { register, login, logoutUser, checkUser, updateProfile };
