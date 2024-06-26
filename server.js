const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const USERS_FILE = './users.json';

const readUsersFromFile = () => {
    if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE);
        return JSON.parse(data);
    }
    return {};
};

const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing to users file:", error);
    }
};

app.post('/register', (req, res) => {
    const { name, email, password, address, phone, cedula, gender, birthday, disability } = req.body;
    const users = readUsersFromFile();

    if (users[cedula]) {
        return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    users[cedula] = {
        name,
        email,
        password,
        address,
        phone,
        cedula,
        gender,
        birthday,
        disability,
        dormitory: null
    };

    writeUsersToFile(users);
    res.status(201).json({ message: 'Registro exitoso' });
});

app.post('/login', (req, res) => {
    const { identifier, password } = req.body;
    const users = readUsersFromFile();
    const user = Object.values(users).find(
        (user) => (user.email === identifier || user.cedula === identifier) && user.password === password
    );

    if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
});

app.put('/users/:cedula', (req, res) => {
    const { cedula } = req.params;
    const updatedData = req.body;
    const users = readUsersFromFile();

    if (!users[cedula]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users[cedula] = { ...users[cedula], ...updatedData };
    writeUsersToFile(users);

    res.status(200).json({ message: 'Usuario actualizado exitosamente', user: users[cedula] });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
