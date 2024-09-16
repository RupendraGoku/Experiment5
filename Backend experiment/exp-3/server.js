const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;
const FILE_PATH = 'students.txt';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
app.use(bodyParser.json()); // To parse JSON data

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function readStudentsFromFile(callback) {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        const students = data.trim().split('\n').map(line => {
            const [id, fname, lname] = line.split(',');
            return { id, fname, lname };
        });
        callback(null, students);
    });
}

function writeStudentsToFile(students, callback) {
    const data = students.map(student => `${student.id},${student.fname},${student.lname}`).join('\n');
    fs.writeFile(FILE_PATH, data, 'utf8', callback);
}

app.get('/viewStudents', (req, res) => {
    readStudentsFromFile((err, students) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        res.json(students);
    });
});

app.post('/students', (req, res) => {
    readStudentsFromFile((err, students) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        const newStudent = {
            id: req.body.id,
            fname: req.body.fname,
            lname: req.body.lname
        };
        students.push(newStudent);
        writeStudentsToFile(students, err => {
            if (err) {
                res.status(500).send('Error saving student data');
                return;
            }
            res.redirect('/');
        });
    });
});

app.put('/students/:id', (req, res) => {
    readStudentsFromFile((err, students) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        const studentIndex = students.findIndex(student => student.id === req.params.id);
        if (studentIndex === -1) {
            res.status(404).send('Student not found');
            return;
        }
        students[studentIndex] = {
            id: req.params.id,
            fname: req.body.fname || students[studentIndex].fname,
            lname: req.body.lname || students[studentIndex].lname
        };
        writeStudentsToFile(students, err => {
            if (err) {
                res.status(500).send('Error saving student data');
                return;
            }
            res.send('Student updated');
        });
    });
});

app.delete('/students/:id', (req, res) => {
    readStudentsFromFile((err, students) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        const newStudents = students.filter(student => student.id !== req.params.id);
        if (students.length === newStudents.length) {
            res.status(404).send('Student not found');
            return;
        }
        writeStudentsToFile(newStudents, err => {
            if (err) {
                res.status(500).send('Error saving student data');
                return;
            }
            res.send('Student deleted');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
