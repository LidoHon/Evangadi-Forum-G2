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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        });

      // Reset form fields and update success state after a 2-second delay
        setTimeout(() => {
        setTitle('');
        setDescription('');
        setTag('');
        setError(null);
        setSuccess('Your question has been posted successfully!');
        setShowQuestionDetails(true);
        }, 2000);
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
        <div className={`${styles.container} bg-orange-100 p-4 shadow-md rounded-md`}>
            <h1>Ask a Question</h1>
            {/* Display success or error messages */}
            {success && <p className="text-green-500 mb-4">{success}</p>}
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
            {/* Render the form for asking a question */}
            <form onSubmit={handleSubmit} className="space-y-4 justify-center">
                <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 lg:text-4xl">
                    Post Your Question
                    </h2>
                    <Link
                    className="no-underline"
                    to="/questions"
                    >
                        Go to questions page
                    </Link>
                </div>
                <div>
                    <label htmlFor="title" className="text-md font-medium">Title</label>
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
                    <label htmlFor="description" className="block text-md font-medium  ">Description</label>
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
                <div className="flex">
                    <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-red-800 text-white rounded-md flex justify-center items-center hover:bg-orange-700 mx-auto text-[20px]"
                    >
                        <span className="mr-2">Send To Community</span>
                        <SendOutlinedIcon style={{ fontSize: 40 }} />
                    </button>
                    {showQuestionDetails && (
                        <div
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex justify-center items-center hover:bg-[#5C0C9E] mx-auto text-[20px]"
                        onClick={handleSeeQuestionDetails}
                        >
                        <span className="mr-2">See Your Question Details...</span>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AskQuestionPage;