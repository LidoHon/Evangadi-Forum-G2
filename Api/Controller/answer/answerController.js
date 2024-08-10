const { StatusCodes } = require('http-status-codes');
const dbConnection = require('../../Database/dbconfig');

// @desc    Create a new answer
// @route   POST /api/questions/:questionId/answers
// @access  Private

const createAnswer = async (req, res) => {
	const { questionId } = req.params;
	const { answer } = req.body;
	const { userid } = req.user;

	if (!answer) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: 'Answer text is required' });
	}

	try {
		// Insert the answer into the database
		const [result] = await dbConnection.query(
			'INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)',
			[userid, questionId, answer]
		);

		// Retrieve the newly created answer along with user details

		const [newAnswer] = await dbConnection.query(
			`SELECT a.answerid, a.answer, a.questionid, a.created_at, a.updated_at, 
					u.userid as userId, u.username as userName 
			FROM answers a 
			JOIN users u ON a.userid = u.userid 
			WHERE a.answerid = ?`,
			[result.insertId]
		);

		return res.status(StatusCodes.CREATED).json(newAnswer[0]);
	} catch (error) {
		console.error('Error creating answer:', error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'Something went wrong. Try again' });
	}
};

// @desc    Get answers for a specific question
// @route   GET /api/question/:questionId/answers
// @access  Public

const getAnswerByQuestionId = async (req, res) => {
	const { questionId } = req.params;

	try {
		const [answers] = await dbConnection.query(
			`
      SELECT a.*, u.username 
      FROM answers a
      JOIN users u ON a.userid = u.userid
      WHERE a.questionid = ?
      `,
			[questionId]
		);

		if (answers.length === 0) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: 'No answers found for this question' });
		}

		return res.status(StatusCodes.OK).json(answers);
	} catch (error) {
		console.error('Error fetching answers:', error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'Something went wrong. Try again' });
	}
};

// @desc    Update an answer
// @route   PUT /api/question/:questionId/answers/:answerid
// @access  Private

const updateAnswer = async (req, res) => {
	const { answerId } = req.params;
	const { answer } = req.body;
	const { userid } = req.user;

	if (!answer) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: 'Answer text is required' });
	}

	try {
		// Update the answer in the database
		const [updateResult] = await dbConnection.query(
			'UPDATE answers SET answer = ? WHERE answerid = ? AND userid = ?',
			[answer, answerId, userid]
		);

		if (updateResult.affectedRows === 0) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: 'Answer not found or unauthorized' });
		}

		// Retrieve the updated answer details along with user information
		const [updatedAnswer] = await dbConnection.query(
			`SELECT a.answerid, a.answer, a.questionid, a.created_at, a.updated_at, 
					u.userid as userId, u.username as userName 
			FROM answers a 
			JOIN users u ON a.userid = u.userid 
			WHERE a.answerid = ?`,
			[answerId]
		);
		// console.log(updatedAnswer);

		return res.status(StatusCodes.OK).json(updatedAnswer[0]);
	} catch (error) {
		console.error('Error updating answer:', error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'Something went wrong. Try again' });
	}
};

// @desc    Delete an answer
// @route   DELETE /api/question/:questionId/answers/:answerid
// @access  Private

const deleteAnswer = async (req, res) => {
	const { answerId } = req.params;
	const { userid } = req.user;

	try {
		// Fetch the answer details before deletion
		const [answerDetails] = await dbConnection.query(
			`SELECT a.answerid, a.answer, a.questionid, a.created_at, a.updated_at,
					u.userid as userId, u.username as userName
			FROM answers a
			JOIN users u ON a.userid = u.userid
			WHERE a.answerid = ? AND a.userid = ?`,
			[answerId, userid]
		);

		// Check if the answer exists
		if (answerDetails.length === 0) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: 'Answer not found or unauthorized' });
		}

		// Perform the deletion
		const [result] = await dbConnection.query(
			'DELETE FROM answers WHERE answerid = ? AND userid = ?',
			[answerId, userid]
		);

		if (result.affectedRows === 0) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: 'Answer not found or unauthorized' });
		}

		// Return the deleted answer details
		return res
			.status(StatusCodes.OK)
			.json({ msg: 'Answer deleted', deletedAnswer: answerDetails[0] });
	} catch (error) {
		console.error('Error deleting answer:', error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: 'Something went wrong. Try again' });
	}
};

module.exports = {
	createAnswer,
	getAnswerByQuestionId,
	updateAnswer,
	deleteAnswer,
};
