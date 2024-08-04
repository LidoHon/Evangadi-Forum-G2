import React, { useState, useEffect } from 'react';
import classes from './styles/answerUI.module.css';
import Avatar from 'react-avatar';
import Spinner from '../../components/Spinner';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosBase from '../../axiosConfig';

const AnswerUI = () => {
	const { questionid } = useParams();
	const navigate = useNavigate();
	const [question, setQuestion] = useState(null);
	const [error, setError] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axiosBase.get('/users/check', {
					withCredentials: true,
				});
				// console.log('User data:', JSON.stringify(response.data, null, 2));
				setUserId(response.data.userid);
			} catch (error) {
				console.error(
					'Error fetching user data:',
					JSON.stringify(
						{
							message: error.response?.data?.msg || error.message,
							stack: error.stack,
						},
						null,
						2
					)
				);
			}
		};

		fetchUser();
	}, []);

	useEffect(() => {
		const fetchQuestionDetails = async () => {
			if (userId === null) return;

			try {
				const res = await axiosBase.get(`/questions/${questionid}`);
				// console.log('Question data:', JSON.stringify(res.data, null, 2));
				setQuestion(res.data);

				// here is to check if the logged-in user is the owner of the question
				if (Number(userId) === Number(res.data.userid)) {
					setIsOwner(true);
				}
			} catch (error) {
				setError('An error occurred while fetching the question details.');
				console.error(
					'Error fetching question details:',
					JSON.stringify(
						{
							message: error.res?.data?.msg || error.message,
							stack: error.stack,
						},
						null,
						2
					)
				);
			}
		};

		fetchQuestionDetails();
	}, [questionid, userId]);

	useEffect(() => {
		console.log('Is owner updated:', isOwner);
	}, [isOwner]);

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	const handleDelete = async () => {
		try {
			await axiosBase.delete(`/questions/${questionid}`);
			alert('Question deleted successfully');
			navigate('/');
		} catch (error) {
			console.error(
				'Error deleting question:',
				JSON.stringify(
					{
						message: error.response?.data?.msg || error.message,
						stack: error.stack,
					},
					null,
					2
				)
			);
		}
	};

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
				<h2 className="text-2xl">Question</h2>
				<p>{question.title}</p>
				<p className="text-xs">{question.description}</p>
				<p className="text-gray-700">
					<span className="font-bold pr-3">Tag:</span> {question.tag}
				</p>
				<p className="text-sm text-gray-500">
					<span className="font-semibold">Asked by</span> {question.username} on{' '}
					{new Date(question.created_at).toLocaleDateString()}
				</p>
				{isOwner && (
					<div className="mt-4">
						<Link
							to={`/questions/edit/${questionid}`}
							className="text-blue-500 hover:underline"
						>
							Edit Question
						</Link>
						<button className="text-red-500 ml-4" onClick={handleDelete}>
							Delete
						</button>
					</div>
				)}
			</div>

			<div className="flex">
				<div id={classes.answer_div} className="container p-10">
					<hr />
					<h1 className="text-center my-5">Answer from Evangadi Community</h1>
					<Link className="text-black no-underline" to="/questions">
						go to questions page
					</Link>
					<hr />
					<div
						id={classes.list_of_answers}
						className="container shadow-lg my-3 p-8"
					>
						<Avatar
							name="abebe kebede"
							round={true}
							size="40px"
							email="abe@gmail.com"
						/>
						<p>Answer given from a forum member</p>
					</div>
				</div>

				<div id={classes.ask_question} className=" container">
					<h2 className=" my-5 text-2xl ps-8">Answer the top question</h2>

					<input
						type="text"
						placeholder="Write your answer"
						className="shadow-md w-100 px-10 mx-8 py-10"
						id={classes.input}
					/>

					<button className="py-4 sm:px-28 mt-3 ms-8 rounded-sm bg-orange-700 text-white">
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default AnswerUI;
