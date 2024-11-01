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
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,  // Max number of connections in the pool
    queueLimit: 0         // Unlimited queueing of connection requests
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Route to get all users from the "users" table
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    // Use a connection from the pool for each request
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        } else if (results.length === 0) {
            res.send('Connection successful! No users found in the database.');
        } else {
            res.json(results);
        }
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
