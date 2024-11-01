const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL-Verbindung
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'testdb'
});

// Verbindung testen
db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
    } else {
        console.log('Mit MySQL verbunden');
    }
});

// Einfache API-Route
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Fehler bei der Datenbankabfrage');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
