import React, { useState } from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import UpdateUser from '../pages/UpdateUser';
import NotFound from '../pages/NotFound';
import AllQuestion from '../pages/AllQuestions';
import SavedQuestions from '../pages/SavedQuestions';
import PrivateRoute from '../components/PrivateRoutes';
import AskQuestion from '../pages/askQuestion/askQuestion';
import AnswerUI from '../pages/answer_Questions/AnswerUI';
const Routing = () => {
	const [savedQuestions, setSavedQuestions] = useState([]);

	const routes = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />

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
						<Route path="/update-profile/" element={<UpdateUser />} />
					</Route>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login/" element={<LoginPage />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Route>
		)
	);

	return <RouterProvider router={routes} />;
};

export default Routing;
