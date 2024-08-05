const express = require('express');
const router = express.Router();
const { updateProfile } = require('../Controller/user/userController')

// Authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

// User controllers
const {
	register,
	login,
	checkUser,
	updateUser,
	logoutUser,
} = require('../Controller/user/userController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// logout route

router.post('/logout', logoutUser);

// Check user route for authentication
router.get('/check', authMiddleware, checkUser);


// Route for updating profile
router.put('/profile/', authMiddleware, updateProfile);

module.exports = router;
