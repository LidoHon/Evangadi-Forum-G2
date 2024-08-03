import React, { useState, useEffect } from 'react';
import axiosBase from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import avater from '/images/istockphoto-1300845620-612x612.jpg';
import Spinner from '../components/Spinner';
import { FaChevronRight, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Avatar from '../components/Avatar';
import { getInitials } from '../utils/getInitials';

const AllQuestion = ({ savedQuestions, setSavedQuestions }) => {
	const [questions, setQuestions] = useState([]);
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axiosBase.get('/questions');
				// console.log(
				// 	'Response data (JSON):',
				// 	JSON.stringify(response.data, null, 2)
				// );
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
		<div className=" p-4 flex flex-col lg:flex-row items-center h-full mx-32">
			<div className=" mb-3 lg:mb-4 flex flex-col justify-center items-center gap-2 md:bg-orange-100 w-5/6 lg:w-1/2">
				<input
					type="text"
					placeholder="Search questions..."
					className=" w-full md:w-3/4 lg:1/2 border rounded p-2 mb-2 mt-3"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button
					className=" bg-red-800 text-white px-4 py-1 rounded hover:bg-red-600"
					onClick={handleAskQuestion}
				>
					Ask Question
				</button>
				<h2 className="text-sm md:text-lg lg:text-2xl font-bold mb-0 md:mb-1">
					<span className="hidden lg:block">Questions from the Community</span>
					<span className="block lg:hidden">Questions</span>
				</h2>
				<Link
					to="/saved-questions"
					className=" text-black hover:underline hover:text-red-800 mb-2"
				>
					Saved questions
				</Link>
			</div>

			{loading && <Spinner />}
			{error && (
				<p className="text-red-500">
					Error fetching questions: {error.message}
				</p>
			)}
			{filteredQuestions.length > 0 ? (
				<ul className=" space-y-4 lg:w-3/6 ">
					{filteredQuestions.map((question) => {
						// Determine if the question is saved
						const isSaved = savedQuestions.some(
							(q) => q.questionid === question.questionid
						);

						return (
							<li
								key={question.questionid}
								className="question-item p-1 flex flex-row items-start border-s-sky-100 border-3  border-b-sky-100 rounded shadow"
							>
								<div className="question-user flex flex-col items-center mb-1 ml-4">
									<img
										src={avater}
										alt="avatar"
										className="avatar w-12 h-12 rounded-full object-cover"
									/>
									{/* <Avatar
                    initials={getInitials(question.username || 'Anonymous')}
                    color="#007bff" // You can choose a color or make it dynamic
                    size={48} // Adjust size as needed
                  /> */}
									<span className="username mt-2 text-sm font-medium">
										{question.username || 'Anonymous'}
									</span>
								</div>
								<div className="question-content flex-1">
									<div className="flex flex-row justify-between mr-4">
										<div className="ml-10 flex flex-col mt-3">
											<p className="mb-2 ">{question.title}</p>
											<p className="">tag:{question.tag}</p>
										</div>

										<Link
											to={`/question-details/${question.questionid}`}
											className="question-link text-red-800 hover:underline mt-4"
										>
											<FaChevronRight />
										</Link>
									</div>

									<div className="flex items-center justify-end ">
										<button
											className="save-question-button  pb-2 mr-4"
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
				<p>No questions available</p>
			)}
		</div>
	);
};

export default AllQuestion;
