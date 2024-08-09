import React, { useState, useEffect } from 'react';
import classes from './styles/answerUI.module.css';
import Avatar from 'react-avatar';
import Spinner from '../../components/Spinner';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosBase from '../../axiosConfig';
import { Popconfirm } from 'antd';
import { GrLinkNext } from 'react-icons/gr';
import { toast, ToastContainer } from 'react-toastify';
import { useUser } from '../../Context/UserContext';
const AnswerUI = () => {
	const { username } = useUser();
	const { questionid } = useParams();
	const navigate = useNavigate();
	const [question, setQuestion] = useState(null);
	const [answers, setAnswers] = useState([]);
	const [newAnswer, setNewAnswer] = useState('');
	const [error, setError] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [userId, setUserId] = useState(null);
	// const [username, setUsername] = useState('');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axiosBase.get('/users/check', {
					withCredentials: true,
				});
				setUserId(response.data.userid);
			} catch (error) {
				console.error('Error fetching user data:', error);
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
				console.error('Error fetching answers:', error);
			}
		};

		fetchAnswers();
	}, [questionid, answers]);

	useEffect(() => {
		const fetchQuestionDetails = async () => {
			if (userId === null) return;

			try {
				const res = await axiosBase.get(`/questions/${questionid}`);
				setQuestion(res.data);

				// Check if the logged-in user is the owner of the question
				if (Number(userId) === Number(res.data.userid)) {
					setIsOwner(true);
				}
			} catch (error) {
				setError('An error occurred while fetching the question details.');
				console.error('Error fetching question details:', error);
			}
		};

		fetchQuestionDetails();
	}, [questionid, userId]);

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	const handleDelete = async () => {
		try {
			await axiosBase.delete(`/questions/${questionid}`);
			toast.success('Question deleted successfully!!', {
				position: 'top-right',
				autoClose: 2000,
			});
			setTimeout(() => {
				navigate('/questions');
			}, 2000);
		} catch (error) {
			console.error('Error deleting question:', error);
		}
	};

	if (!question) {
		return <Spinner />;
	}

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

			const newAnswerData = {
				id: response.data.id,
				content: newAnswer,
				userid: userId,
				username: username,
			};

			setAnswers((prevAnswers) => [...prevAnswers, newAnswerData]);
			setNewAnswer('');
		} catch (error) {
			console.error('Error posting answer:', error);
		}
	};

	const handleDeleteAnswer = async (answerid) => {
		try {
			await axiosBase.delete(`/questions/${questionid}/answers/${answerid}`, {
				withCredentials: true,
			});
			setAnswers((prevAnswers) =>
				prevAnswers.filter((answer) => answer.answerid !== answerid)
			);
			toast.success('Answer deleted successfully!', {
				position: 'top-right',
				autoClose: 2000,
			});
		} catch (error) {
			console.error('Error deleting answer:', error);
			toast.error('Failed to delete the answer.', {
				position: 'top-right',
				autoClose: 2000,
			});
		}
	};

	const handleEditAnswer = async (answerId, newContent) => {
		try {
			await axiosBase.put(
				`/questions/${questionid}/answers/${answerId}`,
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
			console.error('Error editing answer:', error);
		}
	};

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	if (!question) {
		return <Spinner />;
	}

	return (
		<div className="container mx-auto my-8 p-5 rounded-md shadow-md max-w-7xl">
			<div className="bg-orange-100 p-7 rounded-md mb-4">
				<h2 className="text-2xl lg:text-4xl font-semibold">Question</h2>
				<h3 className="text-md mt-2">
					<span className="text-orange-900 font-bold">Title:</span>{' '}
					{question.title}
				</h3>
				<h3 className="text-md mt-2">
					<span className="text-orange-900 font-bold">Description:</span>{' '}
					{question.description}
				</h3>
				<p className="text-gray-700 mt-4">
					<span className="font-bold pr-3">Tag:</span> {question.tag}
				</p>
				<p className="text-sm text-gray-500 mt-2">
					<span className="font-semibold">Asked by</span> {question.username} on{' '}
					{new Date(question.created_at).toLocaleDateString()}
				</p>
				{isOwner && (
					<div className="mt-4">
						<Link to={`/questions/edit/${questionid}`}>
							<button className="px-3 py-1 bg-white text-green-800 border-2 border-green-800 rounded-sm mr-2 hover:bg-green-700 hover:text-white transition duration-300 ease-in-out">
								Edit Question
							</button>
						</Link>
						<Popconfirm
							title="Delete the question"
							description="Are you sure to delete this question?"
							okText="Yes"
							cancelText="No"
							onConfirm={() => handleDelete(questionid)}
						>
							<button className="px-3 py-1 bg-white text-red-800 border-2 border-red-800 rounded-sm hover:bg-red-700 hover:text-white transition duration-300 ease-in-out">
								Delete
							</button>
						</Popconfirm>
					</div>
				)}
			</div>

			<div className="md:flex">
				<div className="flex-1 p-4">
					<h1 className="my-5 text-xl md:text-2xl md:text-center">
						Answers from the Community
					</h1>
					<hr />
					<div className="h-96 overflow-y-auto p-4">
						{answers.length > 0 ? (
							answers.map((answer) => (
								<div
									key={answer.id}
									className="bg-white p-6 rounded-md shadow-lg mb-4"
								>
									<div className="flex items-center mb-4">
										<Avatar
											name={answer.username}
											round={true}
											size="40px"
											className="mr-4"
										/>
										<span className="text-sm font-medium">
											{answer.username || 'Anonymous'}
										</span>
									</div>
									<p className="mb-2">{answer.answer}</p>
									{Number(userId) === Number(answer.userid) && (
										<div className="mt-4">
											<Link
												to={`/questions/${questionid}/answers/${answer.answerid}/edit`}
											>
												<button className="px-3 py-1 bg-white text-green-800 border-2 border-green-800 rounded-sm mr-2 hover:bg-green-700 hover:text-white transition duration-300 ease-in-out">
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
												<button className="px-3 py-1 bg-white text-red-800 border-2 border-red-800 rounded-sm hover:bg-red-700 hover:text-white transition duration-300 ease-in-out">
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
					</div>

					<hr className="my-6" />
					<Link
						to="/questions"
						className="text-orange-800 hover:text-orange-700 font-bold text-lg flex items-center"
					>
						Go to questions page
						<GrLinkNext className="ml-2" />
					</Link>
				</div>

				<div className="flex-1 p-4">
					<h2 className="my-5 text-xl md:text-2xl">Answer the top question</h2>
					<textarea
						placeholder="Write your answer"
						className="w-full p-4 mb-4 rounded-md shadow-md"
						value={newAnswer}
						onChange={(e) => setNewAnswer(e.target.value)}
					/>
					<button
						className="w-full py-3 rounded-sm bg-orange-800 text-white hover:bg-orange-700 transition duration-300 ease-in-out"
						onClick={handlePostAnswer}
					>
						Post Answer
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default AnswerUI;
