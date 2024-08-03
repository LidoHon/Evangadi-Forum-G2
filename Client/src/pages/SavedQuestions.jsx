import React from 'react';
import avater from '/images/istockphoto-1300845620-612x612.jpg';
import { FaChevronRight, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaHandPointRight } from 'react-icons/fa';
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
		navigate('/questions');
	};
	return (
		<div className="p-4 flex  flex-col lg:flex-row items-center h-full container mx-auto">
			<div className="flex mb-2 lg:mb-4 flex-row w-1/2 lg:bg-orange-100 p-4 items-center gap-10 group">
				<div className="flex-col flex items-center pt-3 pl-3 group-hover:blur-sm hover:!blur-none ">
					<h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
						Saved Questions
					</h2>
					<button
						className="  hover:text-neutral-50 bg-red-800 text-white p-1 text-md md:text-md rounded-full px-4 hover:bg-red-600 w-3/4 "
						onClick={handleAllQuestion}
					>
						All questions
					</button>
				</div>
				<div className="relative hidden lg:flex items-center group-hover:blur-sm hover:!blur-none ">
					<div className="absolute inset-y-0 left-5 w-1 bg-orange-200"></div>
					<div className="pl-10 ml-4 text-red-800">
						<FaHandPointRight size={100} />
					</div>
				</div>
			</div>

			{savedQuestions.length > 0 ? (
				<ul className="space-y-4 w-4/6 mx-auto pt-3 group">
					{savedQuestions.map((question) => (
						<li
							key={question.questionid}
							className="p-2 flex flex-row items-start border-s-sky-100 border-3 bg-white  border-b-sky-100 rounded shadow duration-700  group-hover:scale-[0.95] hover:!scale-100"
						>
							<div className=" flex flex-col items-center mb-4">
								<img
									src={avater}
									alt="avatar"
									className="avatar w-12 h-12 rounded-full object-cover"
								/>
								<span className="username mt-2 text-sm font-medium">
									{question.username || 'Anonymous'}
								</span>
							</div>
							<div className="flex-1">
								<div className="flex flex-row justify-between pt-3">
									<p className="mb-2 ml-5">{question.title}</p>
									<Link
										to={`/question-details/${question.questionid}`}
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
