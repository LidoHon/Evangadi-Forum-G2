
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

// Create a new question
// @route   POST /api/questions/askquestion

router.post('/askquestion', authMiddleware, createQuestion);

//   Get all questions
// @route   GET /api/questions

router.get('/', getQuestions);

// Get single question by ID
// @route   GET /api/questions/:id

router.get('/:questionid', getQuestionById);

//Update a question
// @route   PUT /api/questions/:id

router.put('/:questionid', authMiddleware, updateQuestion);

// Delete a question
// @route   DELETE /api/questions/:id

router.delete('/:questionid', authMiddleware, deleteQuestion);

module.exports = router;
