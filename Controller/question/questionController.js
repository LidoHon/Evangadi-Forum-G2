const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../../Database/dbconfig");

// @desc    Create a new question
// @route   POST /api/questions/askquestions
// @access  Private{ people should login to access this route}
const createQuestion = async (req, res) => {
  const { title, description, tag } = req.body;
  const { userid, username } = req.user;

  if (!title || !description || !tag) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Title, description, and tag are required" });
  }

  try {
    // Insert the question into the database
    const [result] = await dbConnection.query(
      "INSERT INTO questions (userid, title, description, tag) VALUES (?, ?, ?, ?)",
      [userid, title, description, tag]
    );

    return res.status(StatusCodes.CREATED).json({
      msg: "Question created successfully",
      question: {
        id: result.insertId, // The auto-generated ID
        title,
        description,
        tag,
        userid,
        username,
      },
    });
  } catch (error) {
    console.error("Error creating question:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Try again" });
  }
};

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public

const getQuestions = async (req, res) => {
  try {
    const [questions] = await dbConnection.query(`
			SELECT 
				questions.questionid,
				questions.userid,
				questions.title,
				questions.description,
				questions.tag,
				questions.created_at,
				questions.updated_at,
				users.username
			FROM questions
			JOIN users ON questions.userid = users.userid
		`);

    return res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Try again" });
  }
};

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public

const getQuestionById = async (req, res) => {
  const { questionid } = req.params;

  console.log("Received questionid:", questionid);

  const id = parseInt(questionid, 10);

  if (isNaN(id)) {
    console.log("Parsed questionid is NaN");
    return res.status(400).json({ message: "Invalid question ID format" });
  }

  try {
    const query = `
            SELECT q.questionid, q.userid, q.title, q.description, q.tag, q.created_at, q.updated_at, u.username
            FROM questions q
            LEFT JOIN users u ON q.userid = u.userid
            WHERE q.questionid = ?
        `;

    const [rows] = await dbConnection.query(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:questionid
// @access  Private

const updateQuestion = async (req, res) => {
  const { questionid } = req.params;
  const { title, description, tag } = req.body;

  // Ensure questionid is an integer
  const id = parseInt(questionid, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid question ID format" });
  }

  if (!title || !description || !tag) {
    return res
      .status(400)
      .json({ message: "Title, description and tag are required" });
  }

  try {
    const query = `
                UPDATE questions
                SET title = ?, description = ?, tag = ?, updated_at = CURRENT_TIMESTAMP
                WHERE questionid = ?
            `;

    const [result] = await dbConnection.query(query, [
      title,
      description,
      tag,
      id,
    ]);

    if (result.affectedRows > 0) {
      res.json({ message: "Question updated successfully" });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.error("Database query error:", error); // Debugging line
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:questionid
// @access  Private

const deleteQuestion = async (req, res) => {
  const { questionid } = req.params;

  // Ensure questionid is an integer
  const id = parseInt(questionid, 10); //url params and query params are usually received as strings so we need to parse it to int..10 in here is radix or base used for the conversion...10 signifies that the string should be parsed as a base-10 (decimal) number..

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid question ID format" });
  }

  try {
    const query = `
            DELETE FROM questions
            WHERE questionid = ?
        `;

    const [result] = await dbConnection.query(query, [id]);

    if (result.affectedRows > 0) {
      res.json({ message: "Question deleted successfully" });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
