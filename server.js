const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const USERS_FILE = './users.json';
const ADMINS_FILE = './admins.json';
const QUESTIONS_FILE = './questions.json';

const readFile = (file) => {
    if (fs.existsSync(file)) {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    }
    return {};
};

const writeFile = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to ${file}:`, error);
    }
};

app.post('/register', (req, res) => {
    const { name, email, password, address, phone, cedula, gender, birthday, disability } = req.body;
    const users = readFile(USERS_FILE);

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
        dormitory: null,
        status: 'pending',
        behavior: null,
        companion: null,
        note: null,
        residency: false
    };

    writeFile(USERS_FILE, users);
    res.status(201).json({ message: 'Registro exitoso' });
});

app.post('/login', (req, res) => {
    const { identifier, password } = req.body;
    const users = readFile(USERS_FILE);
    const admins = readFile(ADMINS_FILE);

    let user = Object.values(users).find(
        (user) => (user.email === identifier || user.cedula === identifier) && user.password === password
    );

    if (!user) {
        user = admins.find(
            (admin) => admin.username === identifier && admin.password === password
        );
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        user.isAdmin = true;
    } else {
        user.isAdmin = false;
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
});

app.post('/questions', (req, res) => {
    const { name, cedula, questions, status = 'pending' } = req.body;
    const questionsData = readFile(QUESTIONS_FILE);

    questionsData[cedula] = {
        name,
        cedula,
        questions,
        status
    };

    writeFile(QUESTIONS_FILE, questionsData);
    res.status(201).json({ message: 'Solicitud enviada con éxito' });
});

app.get('/questions', (req, res) => {
    const questionsData = readFile(QUESTIONS_FILE);
    res.status(200).json(questionsData);
});

app.get('/questions/:cedula', (req, res) => {
    const { cedula } = req.params;
    const questionsData = readFile(QUESTIONS_FILE);

    if (!questionsData[cedula]) {
        return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.status(200).json(questionsData[cedula]);
});

app.put('/questions/:cedula', (req, res) => {
    const { cedula } = req.params;
    const { status } = req.body;
    const questionsData = readFile(QUESTIONS_FILE);

    if (!questionsData[cedula]) {
        return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    questionsData[cedula].status = status;
    writeFile(QUESTIONS_FILE, questionsData);

    const users = readFile(USERS_FILE);
    if (users[cedula]) {
        users[cedula].status = status;
        writeFile(USERS_FILE, users);
    }

    res.status(200).json({ message: 'Estado de la solicitud actualizado con éxito' });
});

app.get('/users', (req, res) => {
    const usersData = readFile(USERS_FILE);
    res.status(200).json(usersData);
});

app.get('/users/:cedula', (req, res) => {
    const { cedula } = req.params;
    const users = readFile(USERS_FILE);

    if (!users[cedula]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(users[cedula]);
});

app.put('/users/:cedula', (req, res) => {
    const { cedula } = req.params;
    const updatedData = req.body;
    const users = readFile(USERS_FILE);

    if (!users[cedula]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users[cedula] = { ...users[cedula], ...updatedData };
    writeFile(USERS_FILE, users);
    res.status(200).json({ message: 'Datos del usuario actualizados con éxito' });
});

app.put('/users/:cedula/residency', (req, res) => {
    const { cedula } = req.params;
    const { residency } = req.body;
    const users = readFile(USERS_FILE);

    if (!users[cedula]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users[cedula].residency = residency;
    writeFile(USERS_FILE, users);
    res.status(200).json({ message: 'Residencia actualizada con éxito' });
});

app.delete('/users/:cedula', (req, res) => {
    const { cedula } = req.params;
    const users = readFile(USERS_FILE);

    if (!users[cedula]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    delete users[cedula];
    writeFile(USERS_FILE, users);
    res.status(200).json({ message: 'Usuario expulsado con éxito' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
