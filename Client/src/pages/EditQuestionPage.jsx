import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosBase from '../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';

const EditQuestionPage = () => {
	const { questionid } = useParams();
	const navigate = useNavigate();

	const [question, setQuestion] = useState({
		title: '',
		description: '',
		tag: '',
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		const fetchQuestion = async () => {
			try {
				const response = await axiosBase.get(`/questions/${questionid}`, {
					withCredentials: true,
				});
				setQuestion({
					title: response.data.title,
					description: response.data.description,
					tag: response.data.tag,
				});
			} catch (error) {
				console.error(
					'Error fetching question:',
					error.response?.data?.message || error.message
				);
				setError('Error fetching question data.');
			}
		};

		fetchQuestion();
	}, [questionid]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setQuestion((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axiosBase.put(
				`/questions/${questionid}`,
				question,
				{ withCredentials: true }
			);
			setSuccess(response.data.message);
			setError(null);
			toast.success('Your question updated successfully!!!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setTimeout(() => {
				navigate(`/questions/${questionid}`);
			}, 2000);
		} catch (error) {
			setError(
				error.response?.data?.message || 'An error occurred. Please try again.'
			);
			setSuccess(null);
		}
	};

	return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg mt-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-800 ">
        Edit Question
      </h1>
      {/* {success && <p className="text-green-500 mb-4">{success}</p>} */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto mr-4 py-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm  text-gray-700 font-bold"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={question.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={question.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="4"
            required
          />
        </div>
        <div>
          <label
            htmlFor="tag"
            className="block text-sm font-bold text-gray-700"
          >
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={question.tag}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-orange-800 text-white rounded-md hover:bg-orange-700 w-full transform hover:scale-95"
        >
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditQuestionPage;
