const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool
const dbConnection = mysql.createPool({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// Function to create tables
const createTables = (connection) => {
	const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            userid INT(20) NOT NULL AUTO_INCREMENT,
            username VARCHAR(20) NOT NULL,
            firstname VARCHAR(20) NOT NULL,
            lastname VARCHAR(20) NOT NULL,
            email VARCHAR(40) NOT NULL,
            password VARCHAR(100) NOT NULL,
            PRIMARY KEY (userid)
        );
    `;

	const questionsTable = `
        CREATE TABLE IF NOT EXISTS questions (
            questionid INT(20) NOT NULL AUTO_INCREMENT,
            userid INT(20) NOT NULL,
            title VARCHAR(50) NOT NULL,
            \`description\` VARCHAR(200) NOT NULL,
            tag VARCHAR(20),
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY ( questionid),
            FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE ON UPDATE CASCADE
        );
    `;

	const answersTable = `
    CREATE TABLE IF NOT EXISTS answers (
        answerid INT AUTO_INCREMENT NOT NULL,
        userid INT NOT NULL,
        questionid INT NOT NULL,
        answer VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (answerid),
        FOREIGN KEY (questionid) REFERENCES questions(questionid) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE ON UPDATE CASCADE
    );
`;

	connection.beginTransaction((err) => {
		if (err) {
			console.error('Error starting transaction:', err);
			connection.release();
			return;
		}

		connection.query(usersTable, (err, result) => {
			if (err) {
				return connection.rollback(() => {
					console.error('Error creating users table:', err);
					connection.release();
				});
			}

			connection.query(questionsTable, (err, result) => {
				if (err) {
					return connection.rollback(() => {
						console.error('Error creating questions table:', err);
						connection.release();
					});
				}

				connection.query(answersTable, (err, result) => {
					if (err) {
						return connection.rollback(() => {
							console.error('Error creating answers table:', err);
							connection.release();
						});
					}

					connection.commit((err) => {
						if (err) {
							return connection.rollback(() => {
								console.error('Error committing transaction:', err);
								connection.release();
							});
						}
						// console.log('Tables created successfully');
						connection.release();
					});
				});
			});
		});
	});
};

// Connect to MySQL and create tables
dbConnection.getConnection((err, connection) => {
	if (err) {
		console.error('Error getting connection from pool:', err);
		return;
	}
	createTables(connection);
});

module.exports = dbConnection.promise();
