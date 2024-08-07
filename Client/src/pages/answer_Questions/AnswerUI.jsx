import React, { useState, useEffect } from "react";
import classes from "./styles/answerUI.module.css";
import Avatar from "react-avatar";
import Spinner from "../../components/Spinner";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import { Popconfirm } from "antd";
import { GrLinkNext } from "react-icons/gr";

const AnswerUI = () => {
  const { questionid } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosBase.get("/users/check", {
          withCredentials: true,
        });
        setUserId(response.data.userid);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axiosBase.get(
          `/questions/${questionid}/answers`
        );
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
        setAnswers([]); // Ensure answers state is an empty array if there's an error
      }
    };

    fetchAnswers();
  }, [questionid]);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      if (userId === null) return;

      try {
        console.log("Fetching question details for question ID:", questionid);
        const questionRes = await axiosBase.get(`/questions/${questionid}`);
        console.log("Question Details:", questionRes.data);
        setQuestion(questionRes.data);

        if (Number(userId) === Number(questionRes.data.userid)) {
          setIsOwner(true);
        }
      } catch (error) {
        setError("An error occurred while fetching the question details.");
        console.error("Error fetching question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [questionid, userId]);

  const handlePostAnswer = async () => {
    if (!newAnswer.trim()) return;

    try {
      const response = await axiosBase.post(
        `/questions/${questionid}/answers`,
        {
          questionId: questionid,
          answer: newAnswer,
          userid: userId,
        },
        {
          withCredentials: true,
        }
      );

      console.log("New Answer Response:", response.data);

      const newAnswerData = {
        id: response.data.id,
        content: newAnswer,
        userid: userId,
        username: username,
      };

      setAnswers((prevAnswers) => [...prevAnswers, newAnswerData]);
      setNewAnswer("");
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      await axiosBase.delete(`/questions/${questionid}/answers/${answerId}`, {
        withCredentials: true,
      });
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== answerId)
      );
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  const handleEditAnswer = async (answerId, newContent) => {
    try {
      await axiosBase.put(
        `/answers/${answerId}`,
        {
          content: newContent,
        },
        {
          withCredentials: true,
        }
      );
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId ? { ...answer, content: newContent } : answer
        )
      );
    } catch (error) {
      console.error("Error editing answer:", error);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!question) {
    return <Spinner />;
  }

  return (
    <div
      className="container rounded-md shadow-md mx-auto my-8"
      id={classes.answer_container}
    >
      <div
        className="container p-7 bg-orange-100 w-100 mx-auto mb-4 rounded-md"
        id={classes.question_card}
      >
        <h2 className="text-3xl font-semibold">Question</h2>
        <h3>
          <span className="text-orange-900 text-sm font-bold">Title:</span>
          {question.title}
        </h3>

        <h3 className="text-xs">
          <span className="text-orange-900 text-sm font-bold">
            Description:
          </span>
          {question.description}
        </h3>
        <br />
        <p className="text-gray-700">
          <span className="font-bold pr-3">Tag:</span> {question.tag}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-l">Asked by</span>{" "}
          {question.username} on{" "}
          {new Date(question.created_at).toLocaleDateString()}
        </p>
        {isOwner && (
          <div className="mt-4">
            <Link to={`/questions/edit/${questionid}`}>
              <button className="px-3 py-1 bg-white text-green-800 border-2 border-green-800 rounded-sm mr-5 hover:bg-green-700 hover:text-white transition duration-300 ease-in-out hover:translate-y-1">
                Edit Question
              </button>
            </Link>

            <Popconfirm
              title="Delete the question"
              description="Are you sure to delete this question?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteQuestion(questionid)}
            >
              <button className="px-3 py-1 bg-white text-red-800 border-2 border-red-800 rounded-sm mr-5 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out hover:translate-y-1">
                Delete
              </button>
            </Popconfirm>
          </div>
        )}
      </div>

      <div className="flex">
        <div id={classes.answer_div} className="container p-10">
          <h1 className="my-5 text-2xl">Answer from Evangadi Community</h1>

          <hr />
          {answers.length > 0 ? (
            answers.map((answer) => (
              <div
                key={answer.id}
                id={classes.list_of_answers}
                className="container shadow-lg my-3 p-8"
              >
                <Avatar
                  name={username}
                  round={true}
                  size="40px"
                  className="mb-2"
                />
                <p className="mb-2">{answer.answer}</p>
                {Number(userId) === Number(answer.userid) && (
                  <div>
                    <Link to={`/questions/edit/${answer.id}`}>
                      <button
                        className="px-3 py-1 bg-white text-green-800 border-2 border-green-800 rounded-sm mr-5 hover:bg-green-700 hover:text-white transition duration-300 ease-in-out hover:translate-y-1"
                        onClick={() => handleEditAnswer(answer.id)}
                      >
                        Edit
                      </button>
                    </Link>
                    <Popconfirm
                      title="Delete the answer"
                      description="Are you sure to delete this answer?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => handleDeleteAnswer(answer.answerid)}
                    >
                      <button className="px-3 py-1 bg-white text-red-800 border-2 border-red-800 rounded-sm mr-5 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out hover:translate-y-1">
                        Delete
                      </button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No answers yet. Be the first to answer!</p>
          )}
          <hr className="mb-9" />
          <Link className={classes.link_container} to="/questions">
            Go to questions page
            <GrLinkNext className={classes.arrow} />
            <div className={classes.glow}></div>
          </Link>
        </div>

        <div id={classes.ask_question} className="container">
          <h2 className="my-5 text-2xl ps-8">Answer the top question</h2>
          <textarea
            placeholder="Write your answer"
            className="shadow-md w-100 px-10 mx-8 py-10"
            id={classes.input}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button
            className="py-4 sm:px-28 mt-3 ms-8 rounded-sm bg-orange-800 text-white hover:bg-orange-700"
            onClick={handlePostAnswer}
          >
            Post Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerUI;
