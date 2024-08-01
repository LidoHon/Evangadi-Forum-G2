import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import UpdateUser from './pages/UpdateUser';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './layouts/MainLayout';
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login/" element={<LoginPage />} />
				<Route path="/update-profile/" element={<UpdateUser />} />
				<Route path="/Profile/" element={<ProfilePage />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Route>
	)
);

const App = () => {

	return <RouterProvider router={router} />;
};

export default App;
