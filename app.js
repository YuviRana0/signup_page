const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/signup', (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    // Save the user data to a JSON file
    fs.readFile('users.json', 'utf8', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        users.push(userData);
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) throw err;
            res.send('User signed up successfully!');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
