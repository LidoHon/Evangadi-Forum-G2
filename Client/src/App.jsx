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
import Register from './pages/Register';
import Login from './pages/Login';
// import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import UpdateUser from './pages/UpdateUser';
import ProfilePage from './pages/ProfilePage';
// import axios from './axiosConfig';
// path="/" element={<MainLayout />}
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route index element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login/" element={<Login />} />
			<Route path="/update-profile/" element={<UpdateUser />} />
			<Route path="/Profile/" element={<ProfilePage />} />
			<Route path="*" element={<NotFound />} />
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
