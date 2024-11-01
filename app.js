const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MySQL configuration
const dbConfig = {
    host: 'db',           // The Docker Compose service name for MySQL
    user: 'root',
    password: 'password',
    database: 'testdb',
    port: 3306
};

// Function to connect with retry logic
function connectWithRetry() {
    const db = mysql.createConnection(dbConfig);
    db.connect((err) => {
        if (err) {
            console.error('Database connection failed, retrying in 5 seconds:', err);
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log('Connected to MySQL');
        }
    });
    return db;
}

const db = connectWithRetry();

// Route to get all users from the "users" table
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        } else {
            res.json(results);
        }
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
