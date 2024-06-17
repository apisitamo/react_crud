const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "add_employee"
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const { title, name, surname, nickname, date, age } = req.body;

    db.query("INSERT INTO employees (title, name, surname, nickname, date, age) VALUES (?, ?, ?, ?, ?, ?)",
        [title, name, surname, nickname, date, age],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, name, surname, nickname, date, age } = req.body;

    db.query("UPDATE employees SET title = ?, name = ?, surname = ?, nickname = ?, date = ?, age = ? WHERE id = ?",
        [title, name, surname, nickname, date, age, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM employees WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen('3001', () => {
    console.log('server run on port 3001');
});
