// Import necessary modules and components
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
	// Initialize state variables
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [showQuestionDetails, setShowQuestionDetails] = useState(false);
	const navigate = useNavigate();

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Send a POST request to the server to create a new question
			const response = await axiosBase.post('/questions/askquestion', {
				title,
				description,
				tag,
			});

			// Display a success toast message
			toast.success('Your question is posted successfully!!', {
				position: 'top-right',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			// Reset form fields and update success state after a 2-second delay
			setTimeout(() => {
				setTitle('');
				setDescription('');
				setTag('');
				setError(null);
				setSuccess('Your question has been posted successfully!');
				setShowQuestionDetails(true);
			}, 1000);
		} catch (error) {
			// Handle any errors that occur during the request
			setError(
				error.response?.data?.msg || 'An error occurred. Please try again.'
			);
			setSuccess(null);
		}
	};

	// Navigate to the questions page when the user clicks the "See Your Question Details..." button
	const handleSeeQuestionDetails = () => {
		navigate('/questions');
	};

	return (
		<div
			className={`${styles.container}  px-6 py-16  rounded-md mb-2 shadow-xl lg:min-w-[1350px] md:min-w-[800px]`}
		>
			<div className="flex flex-col md:flex-row ">
				<div className="">
					<h1 className="font-bold text-3xl ms-12 text-orange-800 pt-4">
						Ask a Question
					</h1>
					{/* Display success or error messages */}
					<ToastContainer />
					{/* {success && <p className="text-green-500 mb-4">{success}</p>} */}
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<div className={styles.general_desc}>
						{/* Display instructions for writing a good question */}
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
				</div>
				{/* Render the form for asking a question */}

				<form
					onSubmit={handleSubmit}
					className="space-y-4 mx-auto px-4 sm:px-6 lg:px-8 md:w-2/3"
				>
					<div className="flex flex-col text-center md:text-left sm:mx-auto md:w-full">
						<h2 className="text-2xl md:text-3xl font-bold mb-2 lg:text-4xl sm:text-xl">
							Post Your Question
						</h2>
						<Link
							className="no-underline hover:text-orange-700 hover:font-semibold text-orange-800 transition-all"
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
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
						/>
					</div>
					<div>
						<label htmlFor="description" className="block text-md font-medium">
							Description
						</label>
						<textarea
							id="description"
							placeholder="Question Description..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
						/>
					</div>
					<div>
						<label htmlFor="tag" className="block text-md font-medium">
							Tag
						</label>
						<input
							type="text"
							id="tag"
							value={tag}
							onChange={(e) => setTag(e.target.value)}
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
						/>
					</div>
					<div className="flex flex-col md:flex-row md:space-x-4">
						<button
							type="submit"
							className="mt-4 py-3 bg-orange-800 text-white px-5 rounded-md flex justify-center items-center hover:bg-orange-700 text-lg w-full md:w-auto transform transition-transform duration-200 hover:scale-95"
						>
							<span className="text-center">Send To Community</span>
							<SendOutlinedIcon style={{ fontSize: 30 }} />
						</button>
						{showQuestionDetails && (
							<div
								onClick={handleSeeQuestionDetails}
								className="mt-4 px-5 py-3 bg-green-800 text-white rounded-md flex justify-center items-center hover:bg-green-700 w-full md:w-auto transform text-lg transition-transform duration-200 hover:scale-95"
							>
								<span className="mr-2">See Details</span>
								<SendOutlinedIcon style={{ fontSize: 30 }} />
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default AskQuestionPage;
