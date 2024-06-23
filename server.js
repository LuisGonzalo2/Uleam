const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importar cors

const app = express();
const PORT = 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Usar cors

// Helper function to read users from JSON file
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    const usersData = fs.readFileSync(USERS_FILE);
    return JSON.parse(usersData);
};

// Helper function to write users to JSON file
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Register route
app.post('/register', (req, res) => {
    const {
        name, email, password, address, phone, cedula, gender, birthday, disability
    } = req.body;
    const users = readUsers();

    console.log('Register request received:', req.body);

    if (users.find(user => user.email === email || user.cedula === cedula)) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({
        name, email, password, address, phone, cedula, gender, birthday, disability
    });
    writeUsers(users);
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', (req, res) => {
    const { identifier, password } = req.body;
    const users = readUsers();

    console.log('Login request received:', req.body);

    const user = users.find(user =>
        (user.email === identifier || user.cedula === identifier) && user.password === password
    );

    if (!user) {
        console.log('Invalid identifier or password');
        return res.status(401).json({ message: 'Invalid identifier or password' });
    }

    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
