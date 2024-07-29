import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	useNavigate,
	BrowserRouter,
} from 'react-router-dom';
import React from 'react';
// import { useEffect } from 'react';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
// import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import UpdateUser from './pages/UpdateUser';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './layouts/MainLayout';
// import axios from './axiosConfig';
// path="/" element={<MainLayout />}
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
	// const navigate = useNavigate();

	// const checkUser = async () => {
	// 	try {
	// 		await axios.get('/users/check');
	// 	} catch (error) {
	// 		console.log(error.response);
	// 		navigate('/login');
	// 	}
	// };
	// useEffect(() => {
	// 	checkUser();
	// }, []);

	return <RouterProvider router={router} />;
};

export default App;
