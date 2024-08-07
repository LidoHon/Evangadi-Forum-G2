import React, { useState } from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import RegisterPage from '../pages/RegisterPage';
import Login from '../components/Login';
import NotFound from '../pages/NotFound';
import UpdateUser from '../pages/updateUser/UpdateUser';
import AllQuestion from '../pages/AllQuestions';
import SavedQuestions from '../pages/SavedQuestions';
import PrivateRoute from '../components/PrivateRoutes';
import AskQuestion from '../pages/askQuestion/askQuestion';
import AnswerUI from '../pages/answer_Questions/AnswerUI';
import EditQuestionPage from '../pages/EditQuestionPage';
import HowItWorks from '../pages/howItworks/HowItWorks';
import Landing from '../pages/landing/Landing';
import EditAnswerPage from '../pages/EditAnswePage';
const Routing = () => {
	const [savedQuestions, setSavedQuestions] = useState([]);

	const routes = createBrowserRouter(
		createRoutesFromElements(
			<Route element={<MainLayout />}>
				<Route index element={<Landing />} />

				{/* Private routes */}
				<Route element={<PrivateRoute />}>
					<Route
						path="/questions"
						element={
							<AllQuestion
								savedQuestions={savedQuestions}
								setSavedQuestions={setSavedQuestions}
							/>
						}
					/>
					<Route
						path="/saved-questions"
						element={
							<SavedQuestions
								savedQuestions={savedQuestions}
								setSavedQuestions={setSavedQuestions}
							/>
						}
					/>
					<Route path="/ask-question" element={<AskQuestion />} />
					<Route path="/questions/:questionid" element={<AnswerUI />} />
					<Route
						path="/questions/edit/:questionid"
						element={<EditQuestionPage />}
					/>
					<Route
						path="/questions/:questionid/answers/:answerid/edit"
						element={<EditAnswerPage />}
					/>
					<Route path="/update-profile" element={<UpdateUser />} />
				</Route>

				{/* Public routes */}
				<Route path="/howItWorks" element={<HowItWorks />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);

	return <RouterProvider router={routes} />;
};

export default Routing;
