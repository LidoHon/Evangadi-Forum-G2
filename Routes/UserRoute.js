const express = require('express');
const router = express.Router();

// Authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

// User controllers
const {
	register,
	login,
	checkUser,
	updateUser,
} = require('../Controller/user/userController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Check user route for authentication
router.get('/check', authMiddleware, checkUser);

// Update user route
router.put('/updateUser', updateUser);

module.exports = router;
