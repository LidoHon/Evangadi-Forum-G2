

const database = require("../../Database/dbconfig");
const userController = require("../user/userController")
const userid = userController.user[0].userid;
module.exports = {
  createQuestion: (req, res) => {
    const { title, description, tag, userid } = req.body;
    if (!title || !description || !userid)
      return res.status(400).json({
        msg: "The required fields (title, description, userid) are not provided",
      });

    const questionid = `Q-${Date.now().toString(24)}`;

    const query = `
      INSERT INTO questions (questionid, userid, title, description, tag)
      VALUES (?, ?, ?, ?, ?)
    `;

    database.execute(query, [questionid, userid, title, description, tag], (err, result) => {
      if (err) {
        console.error('Error creating question:', err);
        return res.status(500).json({ msg: "Database connection error" });
      }

      return res.status(200).json({
        msg: "Question added successfully",
        data: {
          id: result.insertId,
          questionid,
          userid,
          title,
          description,
          tag
        }
      });
    });
  },

  getAllQuestions: async (req, res) => {
    try {
      const [result] = await database.execute(`
        SELECT q.id, q.questionid, q.userid, q.title, q.description, q.tag
        FROM questions q
      `);

      return res.status(200).json({
        questions: result,
      });
    } catch (err) {
      console.error("Error getting all questions:", err);
      return res.status(500).json({
        msg: "Database connection error",
      });
    }
  },

  getQuestion: (req, res) => {
    const { questionid } = req.params;
    if (!questionid)
      return res.status(400).json({
        msg: "The questionid field is not provided",
      });
  
    const query = `
      SELECT q.id, q.questionid, q.userid, q.title, q.description, q.tag
      FROM questions q
      WHERE q.questionid = ?
    `;
  
    database.execute(query, [questionid], (err, result) => {
      if (err) {
        console.error('Error getting question:', err);
        return res.status(500).json({
          msg: "Database connection error",
        });
      }
  
      if (result.length === 0) {
        return res.status(404).json({
          msg: "Question not found",
        });
      }
  
      return res.status(200).json({
        data: result[0],
      });
    });
  },

  updateQuestion: (req, res) => {
    const { questionid, title, description, tag } = req.body;
    if (!questionid || !title || !description)
      return res.status(400).json({
        msg: "The required fields (questionid, title, description) are not provided",
      });

    const query = `
      UPDATE questions
      SET title = ?, description = ?, tag = ?
      WHERE questionid = ?
    `;

    database.execute(query, [title, description, tag, questionid], (err, result) => {
      if (err) {
        console.error('Error updating question:', err);
        return res.status(500).json({
          msg: "Database connection error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          msg: "Question not found",
        });
      }

      return res.status(200).json({
        msg: "Question updated successfully",
      });
    });
  },

  deleteQuestion: (req, res) => {
    const { questionid } = req.body;
    if (!questionid)
      return res.status(400).json({
        msg: "The questionid field is not provided",
      });

    const query = `
      DELETE FROM questions
      WHERE questionid = ?
    `;

    database.execute(query, [questionid], (err, result) => {
      if (err) {
        console.error('Error deleting question:', err);
        return res.status(500).json({
          msg: "Database connection error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          msg: "Question not found",
        });
      }

      return res.status(200).json({
        msg: "Question deleted successfully",
      });
    });
  }
};
