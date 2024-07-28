const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dbConnection = require('../../Database/dbconfig');

// register a user
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
				.json({ msg: 'user already rigestered! ' });
		}

		if (!passwordRegex.test(password)) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'password must be greater than eight characters! ' });
		}

		// encrypting the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await dbConnection.query(
			'INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)',
			[username, firstname, lastname, email, hashedPassword]
		);
		return res
			.status(StatusCodes.CREATED)
			.json({ msg: 'user account created' });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'something went wrong. Try again' });
	}
};

// login a user

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
		if (user.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'invalid credentials' });
		}
		// compare passwords
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: 'invalid credentials' });
		}
		const username = user[0].username;
		const userid = user[0].userid;
		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
			expiresIn: '3d',
		});

		return res
			.status(StatusCodes.OK)
			.json({ msg: 'user login successfull', token, username, userid });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'something went wrong. Try again' });
	}
};

//get user

const checkUser = async (req, res) => {
	const username = req.user.username;
	const userid = req.user.userid;
	res.status(StatusCodes.OK).json({ msg: 'valid user', username, userid });
	res.send('check user');
};

//update profile

const updateUser = async (req, res) => {
	const { userid, username, firstname, lastname, email, password } = req.body;
	if (!password || !email || !firstname || !lastname || !username) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: 'please provide all required information ' });
	}
	try {
		const [user] = await dbConnection.query(
			'select userid from users where userid = ?',
			[userid]
		);
		if (user.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({ msg: 'user not found' });
		}

		let updateQuery =
			'UPDATE users SET username = ?, firstname = ?, lastname = ?, email = ?';
		const queryParams = [username, firstname, lastname, email];

		if (password) {
			if (password.length < 8) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: 'password must be greater than eight characters! ' });
			}
			// encrypting the password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			updateQuery += ', password = ?';
			queryParams.push(hashedPassword);
		}

		updateQuery += ' WHERE userid = ?';
		queryParams.push(userid);

		await dbConnection.query(updateQuery, queryParams);
		return res.status(StatusCodes.OK).json({ msg: 'user account updated' });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'something went wrong. Try again' });
	}
	res.send('updated');
};

module.exports = { register, login, checkUser, updateUser };
