const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routes/UserRoute');
const questionsRoutes = require('./Routes/questionRoute');
const dbConnection = require('./Database/dbconfig');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

// Initialize Express app
const app = express();

// assigning port
const PORT = process.env.PORT || 5000;

// middlewares
// app.use(cors());
const corsOptions = {
	origin: 'http://localhost:5173', // Your frontend URL
	credentials: true, // Allow cookies and authorization headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
// json middleware to extract json data
app.use(express.json());

// cookie parser middle ware
app.use(cookieParser());

// routes

// user routes middleware
app.use('/api/users', userRoutes);

// question routes middleware
app.use('/api/questions', authMiddleware, questionsRoutes);

// answer routes middleware

const start = async () => {
	try {
		const result = await dbConnection.execute("select 'test' ");
		app.listen(PORT);
		// console.log(result);
		console.log('database connected');
		console.log(`server running on port ${PORT}`);
	} catch (error) {
		console.log(error.message);
	}
};
start();
