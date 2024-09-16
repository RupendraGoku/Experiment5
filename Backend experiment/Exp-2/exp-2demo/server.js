const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
app.use(bodyParser.json()); // To parse JSON data

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Read all students
app.get('/viewStudents', (req, res) => {
    fs.readFile('viewStudents.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Create a new student
app.post('/students', (req, res) => {
    fs.readFile('viewStudents.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        const students = JSON.parse(data);
        const newStudent = {
            id: req.body.id,
            fname: req.body.fname,
            lname: req.body.lname
        };
        students.push(newStudent);
        fs.writeFile('viewStudents.json', JSON.stringify(students, null, 2), err => {
            if (err) {
                res.status(500).send('Error saving student data');
                return;
            }
            res.redirect('/');
        });
    });
});

// Update a student's details
app.put('/students/:id', (req, res) => {
    fs.readFile('viewStudents.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        const students = JSON.parse(data);
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
        fs.writeFile('viewStudents.json', JSON.stringify(students, null, 2), err => {
            if (err) {
                res.status(500).send('Error saving student data');
                return;
            }
            res.send('Student updated');
        });
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    fs.readFile('viewStudents.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading student data');
            return;
        }
        const students = JSON.parse(data);
        const newStudents = students.filter(student => student.id !== req.params.id);
        if (students.length === newStudents.length) {
            res.status(404).send('Student not found');
            return;
        }
        fs.writeFile('viewStudents.json', JSON.stringify(newStudents, null, 2), err => {
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
