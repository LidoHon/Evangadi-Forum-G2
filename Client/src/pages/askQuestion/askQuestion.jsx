import React, { useState } from 'react';
import axiosBase from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import styles from './askQuestion.module.css';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AskQuestionPage = () => {
	//useState hook to manage the state of the title, description, tag, error, and success variables
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const navigate = useNavigate();

	//The handleSubmit function is called when the form is submitted.
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axiosBase.post('/questions/askquestion', {
			title,
			description,
			tag,
			});
			toast.success('Your question is posted successfully!!', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
			});
	
		  // Delay the navigation to the questions page
			setTimeout(() => {
			setTitle('');
			setDescription('');
			setTag('');
			setError(null);
			navigate('/questions');
		  }, 2000); // 2 seconds delay
		} catch (error) {
			setError(
			error.response?.data?.msg || 'An error occurred. Please try again.'
			);
			setSuccess(null);
		}
	};

	return (
		<div
			className={`${styles.container} bg-orange-100 p-4 shadow-md rounded-md`}
		>
			<h1>Ask a Question</h1>
			{success && <p className="text-green-500 mb-4">{success}</p>}
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<div className={styles.general_desc}>
				<p className={styles.title}>Steps to write a good question</p>
				<div className={styles.Summarize}>
					<ul>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Summarize your problem in a one-line title.
						</li>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Describe your problem in more detail.
						</li>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Describe what you tried and what you expected to happen.
						</li>
						<li>
							<ArrowCircleRightTwoToneIcon style={{ fontSize: 30 }} />
							Review your question and post it to the site.
						</li>
					</ul>
				</div>
			</div>
			<form onSubmit={handleSubmit} className="space-y-4 justify-center">
				<div className="flex flex-col items-center justify-center text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-2 lg:text-4xl">
						Post Your Question
					</h2>
					<Link
						className="text-black hover:text-gray-700 no-underline"
						to="/questions"
					>
						Go to questions page
					</Link>
				</div>

				<div>
					<label htmlFor="title" className="text-md font-medium">
						Title
					</label>
					<input
						type="text"
						id="title"
						placeholder="Question Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-[20px]"
					/>
				</div>
				<div>
					<label htmlFor="description" className="block text-md font-medium  ">
						Description
					</label>
					<textarea
						id="description"
						placeholder="Question Description. . ."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-[20px]"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="tag"
						placeholder="tag"
						className="block text-md font-medium  "
					>
						Tag
					</label>
					<input
						type="text"
						id="tag"
						value={tag}
						onChange={(e) => setTag(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-[20px]"
						required
					/>
				</div>
				<button
					type="submit"
					className="mt-4 px-4 py-2 bg-red-800 text-white rounded-md flex justify-center items-center hover:bg-orange-700 mx-auto text-[20px]"
				>
					<span className="mr-2">Send To Community</span>
					<SendOutlinedIcon style={{ fontSize: 40 }} />
				</button>
			</form>
		</div>
	);
};

export default AskQuestionPage;