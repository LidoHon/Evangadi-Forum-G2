const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
	createQuestion,
	getQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
} = require('../Controller/question/questionController');

// @desc    Create a new question
// @route   POST /api/questions/askquestion
// @access  Private
router.post('/askquestion', authMiddleware, createQuestion);

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
router.get('/', getQuestions);

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public
router.get('/:questionid', getQuestionById);

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private
router.put('/:questionid', authMiddleware, updateQuestion);

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private
router.delete('/:questionid', authMiddleware, deleteQuestion);

module.exports = router;
