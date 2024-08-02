
import React from 'react';
import Routing from './routes/Routing';



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

	return <Routing />;
};

export default App;
