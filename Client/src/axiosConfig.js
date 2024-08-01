import axios from 'axios';

const axiosBase = axios.create({
	baseURL: 'https://localhost:5000/api',
	withCredentials: true,
});
export default axiosBase;
