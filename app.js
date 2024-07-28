const express = require('express');
const userRoutes = require('./Routes/UserRoute');
const questionsRoutes = require('./Routes/questionRoute');
// db connection
const dbConnection = require('./Database/dbconfig');
const cors = require('cors');
// authentication middleware file
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

// Initialize Express app
const app = express();

// assigning port
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
// json middleware to extract json data
app.use(express.json());

// user routes middleware
app.use('/api/users', userRoutes);

// question routes middleware
app.use('/api/questions', authMiddleware, questionsRoutes);

// answer routes middleware

// app.get('/', (req, res) => {
// 	res.send('hey');
// });

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
