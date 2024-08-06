import React from "react";
import { FaChevronRight, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";
import Avatar from "react-avatar";
const SavedQuestions = ({ savedQuestions, setSavedQuestions }) => {
  const handleSaveQuestion = (question) => {
    setSavedQuestions((prevQuestions) => {
      const isSaved = prevQuestions.some(
        (q) => q.questionid === question.questionid
      );
      let updatedQuestions;
      if (isSaved) {
        updatedQuestions = prevQuestions.filter(
          (q) => q.questionid !== question.questionid
        );
      } else {
        updatedQuestions = [...prevQuestions, question];
      }
      return updatedQuestions;
    });
  };

  if (!Array.isArray(savedQuestions)) {
    return <p>No saved questions available</p>;
  }
  const navigate = useNavigate();
  const handleAllQuestion = () => {
    navigate("/questions");
  };
  return (
    <div className="p-4 flex  flex-col lg:flex-row  h-full container mx-auto ">
      <div className=" mb-3 lg:mb-4 flex flex-col gap-2 lg:bg-orange-50 rounded-lg  lg:w-1/2 group lg:h-40 shadow-md items-center">
        <div className="flex flex-row lg:pt-14">
          <div className="flex-col flex items-center pt-3 pl-3 hover:!blur-none mx-auto">
            <h2 className="text-sm md:text-lg lg:text-2xl font-bold mb-0 md:mb-1 mx-auto  flex">
              Saved Questions
            </h2>
          </div>
          <div className="relative hidden lg:flex items-center  hover:!blur-none ">
            <div className="absolute inset-y-0 left-5 w-1 bg-orange-200"></div>
            <div className="pl-10 ml-4 text-red-800"></div>
          </div>
        </div>
        <button
          className="py-4 sm:px-28 mt-20 rounded-sm bg-orange-800 text-white  hover:bg-orange-700 transition duration-300 ease-in-out hover:translate-x-1 hover:translate-y-1 mx-auto "
          onClick={handleAllQuestion}
        >
          All questions
        </button>
      </div>
      <FaHandPointRight size={60} className="text-red-800 mt-10 ms-5" />

      {savedQuestions.length > 0 ? (
        <ul className=" space-y-4 lg:w-2/6 mx-auto group">
          {savedQuestions.map((question) => (
            <li
              key={question.questionid}
              className="question-item p-1 flex flex-row items-start border-s-sky-100 border-3 duration-700  group-hover:scale-[0.95] hover:!scale-100 border-b-sky-100 rounded shadow "
            >
              <div className=" flex flex-col items-center mb-4">
                <Avatar
                  name={question.username}
                  round={true}
                  size="40px"
                  className="mb-2"
                />
                <span className="username mt-2 text-sm font-medium">
                  {question.username || "Anonymous"}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex flex-row justify-between pt-3">
                  <p className="mb-2 ml-5">{question.title}</p>
                  <Link
                    to={`/questions/${question.questionid}`}
                    className="question-link text-red-800 hover:underline"
                  >
                    <FaChevronRight />
                  </Link>
                </div>

                <div className="flex justify-end items-center pt-3">
                  <button
                    className="save-button"
                    onClick={() => handleSaveQuestion(question)}
                  >
                    {savedQuestions.some(
                      (q) => q.questionid === question.questionid
                    ) ? (
                      <FaBookmark className="text-red-800" />
                    ) : (
                      <FaRegBookmark className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg lg:text-5xl font-bold uppercase  text-center my-auto">
          No saved questions available
        </p>
      )}
    </div>
  );
};

export default SavedQuestions;
