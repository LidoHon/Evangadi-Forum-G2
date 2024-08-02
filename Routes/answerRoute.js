const express = require('express');
const {
	createAnswer,
	getAnswerByQuestionId,
	updateAnswer,
	deleteAnswer,
} = require('../Controller/answer/answerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(authMiddleware, createAnswer)
	.get(authMiddleware, getAnswerByQuestionId);

router
	.route('/:answerId')
	.put(authMiddleware, updateAnswer)
	.delete(authMiddleware, deleteAnswer);

module.exports = router;
