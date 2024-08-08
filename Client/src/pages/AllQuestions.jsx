import React, { useState, useEffect } from 'react';
import axiosBase from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FaChevronRight, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { FaHandPointRight } from 'react-icons/fa';
import Avatar from 'react-avatar';

const AllQuestion = ({ savedQuestions, setSavedQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosBase.get('/users');
        const users = response.data;
        const userMap = {};
        users.forEach((user) => {
          userMap[user.userid] = user.username;
        });
        setUserDetails(userMap);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosBase.get('/questions');
        const sortedQuestions = response.data
          ? [...response.data].sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
          : [];
        setQuestions(sortedQuestions);
        setFilteredQuestions(sortedQuestions);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredQuestions(
        questions.filter(
          (question) =>
            question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            question.tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredQuestions(questions);
    }
  }, [searchTerm, questions]);

  const handleAskQuestion = () => {
    navigate('/ask-question');
  };

  const handleSaveQuestion = (question) => {
    setSavedQuestions((prevSavedQuestions) => {
      const isSaved = prevSavedQuestions.some(
        (q) => q.questionid === question.questionid
      );
      const updatedQuestions = isSaved
        ? prevSavedQuestions.filter((q) => q.questionid !== question.questionid)
        : [...prevSavedQuestions, question];

      return updatedQuestions;
    });
  };

  return (
    <div className="allQuestion p-4 flex flex-col lg:flex-row h-full container mx-auto max-w-6xl">
      <div className="mb-3 lg:mb-4 flex flex-col gap-2 bg-orange-50 rounded-lg lg:w-1/2 group lg:h-40 shadow-md p-4">
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold mb-0 md:mb-1 mx-auto mt-5 flex">
          <span className="hidden lg:block">Questions from the Community</span>
          <span className="block lg:hidden text-2xl">Search Questions</span>
        </h2>
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full md:w-3/4 lg:w-1/2 border rounded p-2 mb-2 mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col gap-4 group cursor-pointer container bg-white shadow-lg mt-8 lg:w-100 p-6 rounded-lg">
          <h2 className="font-semibold">Have a question in mind?</h2>
          <button
            className="py-2 sm:px-28 rounded bg-orange-800 text-white hover:bg-orange-700 transition duration-300 ease-in-out hover:translate-x-1 hover:translate-y-1"
            onClick={handleAskQuestion}
          >
            Ask Question
          </button>
          <Link
            to="/saved-questions"
            className="text-orange-700 font-serif mt-4 no-underline flex hover:text-orange-600 font-bold"
          >
            Saved questions
            <FaBookmark className="text-red-800 mt-1 ml-2" />
          </Link>
        </div>
      </div>

      <FaHandPointRight
        className="ml-10 mb-4 mr-2 rotate-90 lg:rotate-0 text-red-800"
        size={60}
      />

      {loading && <Spinner />}
      {error && (
        <p className="text-red-500 font-semibold text-center">
          Error fetching questions: {error.message}
        </p>
      )}
      <div className="h-[500px] overflow-y-scroll w-full lg:w-2/3 mx-auto">
        {filteredQuestions.length > 0 ? (
          <ul className="space-y-4 w-5/6 lg:w-4/6 mx-auto group">
            {filteredQuestions.map((question) => {
              const isSaved = savedQuestions.some(
                (q) => q.questionid === question.questionid
              );

              return (
                <li
                  key={question.questionid}
                  className="question-item p-1 flex flex-row items-start border-s-sky-100 border-3 duration-700 group-hover:scale-[0.95] hover:!scale-100 border-b-sky-100 rounded shadow"
                >
                  <div className="question-user flex flex-col items-center mb-1 ml-4">
                    <Avatar
                      alt="avatar"
                      name={question.username}
                      size="40"
                      className="avatar w-12 h-12 rounded-full object-cover mt-2"
                    />
                    <span className="username mt-2 text-sm font-medium">
                      {question.username || 'Anonymous'}
                    </span>
                  </div>
                  <div className="question-content flex-1">
                    <div className="flex flex-row justify-between mr-4">
                      <div className="ml-10 flex flex-col mt-3">
                        <p className="mb-2">{question.title}</p>
                        <p>
                          <span className="text-orange-800 font-bold">tag: </span>
                          {question.tag}
                        </p>
                      </div>
                      <Link
                        to={`/questions/${question.questionid}`}
                        className="question-link text-red-800 hover:underline mt-4 flex no-underline"
                      >
                        <span>Details</span>
                        <FaChevronRight className="ml-2 mt-1" />
                      </Link>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        className="save-question-button pb-2 mr-4"
                        onClick={() => handleSaveQuestion(question)}
                      >
                        {isSaved ? (
                          <FaBookmark className="text-red-800" />
                        ) : (
                          <FaRegBookmark className="text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-lg lg:text-4xl uppercase text-center font-bold">
            No questions available!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllQuestion;
