import React, { useState } from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import UpdateUser from './pages/UpdateUser';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './layouts/MainLayout';
import AllQuestion from './pages/AllQuestions';
import SavedQuestions from './pages/SavedQuestions';

const App = () => {
	const [savedQuestions, setSavedQuestions] = useState([]);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
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
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/update-profile" element={<UpdateUser />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
