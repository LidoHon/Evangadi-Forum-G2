const express = require('express');
const userRoutes = require('./Routes/UserRoute');
const questionsRoutes = require('./Routes/questionRoute');
const https = require("https")
const fs = require("fs")
const path = require("path")

//SSL certificate and private key for HTTPS server
const privateKeyPath = path.join(__dirname, 'private-key-no-passphrase.pem');
const certificatePath = path.join(__dirname, 'certificate.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const options = {
    key: privateKey,
    cert: certificate
  };

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

async function Testdb(){
    try {
       
        https.createServer(options, app).listen(PORT, () =>{
        console.log("DB connection is established")
        console.log(`server running on port ${PORT}`)
      
     })} catch (error) {
         console.log(error.message)
     }
}
Testdb()
