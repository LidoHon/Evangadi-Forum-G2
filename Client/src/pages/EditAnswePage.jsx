import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosBase from '../axiosConfig';
import Spinner from '../components/Spinner';
const EditAnswerPage = () => {
	const { questionid, answerid } = useParams();
	const navigate = useNavigate();
	const [answer, setAnswer] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAnswer = async () => {
			try {
				const response = await axiosBase.get(
					`/questions/${questionid}/answers/`
				);
				// console.log(response);
				setAnswer(response.data.answer);
				setLoading(false);
			} catch (err) {
				setError('Failed to fetch answer');
				setLoading(false);
			}
		};

		fetchAnswer();
	}, [questionid, answerid]);

	const handleChange = (e) => {
		setAnswer(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosBase.put(
				`/questions/${questionid}/answers/${answerid}`,
				{ answer },
				{ withCredentials: true }
			);
			navigate(`/questions/${questionid}`);
		} catch (err) {
			setError('Failed to update answer');
		}
	};

	if (loading) return <Spinner />;
	if (error) return <p>{error}</p>;

	return (
		<div className="max-w-md mx-auto p-4 border rounded-md shadow-lg">
			<h1 className="text-2xl font-bold mb-4">Edit Answer</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="answer"
						className="block text-sm font-medium text-gray-700"
					>
						Answer
					</label>
					<textarea
						id="answer"
						name="answer"
						rows="4"
						value={answer}
						onChange={handleChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
				>
					Update Answer
				</button>
			</form>
		</div>
	);
};

export default EditAnswerPage;
