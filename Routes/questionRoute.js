
const express = require('express');
const router = express.Router();
const questionController = require('../Controller/question/questionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware,questionController.createQuestion);
router.get('/all',authMiddleware, questionController.getAllQuestions);
router.get('/get/:questionid', authMiddleware, questionController.getQuestion);
router.put('/update',authMiddleware, questionController.updateQuestion);
router.delete('/delete', authMiddleware,questionController.deleteQuestion);

module.exports = router;