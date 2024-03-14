const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Массивы для хранения пользователей и клозов
let users = [];
let events = [];

// Middleware для обработки данных JSON
app.use(bodyParser.json());

// Создание клоза
app.post('/create-event', (req, res) => {
    const eventName = req.body.name;
    if (!eventName) {
        return res.status(400).json({ error: 'Event name is required' });
    }

    // Здесь может быть ваша логика создания клоза
    // Например, балансировка команд и выбор ролей

    const newEvent = { name: eventName, date: new Date().toLocaleString() };
    events.push(newEvent);

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
});

// Регистрация пользователя
app.post('/register', (req, res) => {
    const { username, rating, role } = req.body;
    if (!username || !rating || !role) {
        return res.status(400).json({ error: 'Username, rating, and role are required' });
    }

    // Здесь может быть ваша логика регистрации пользователя в клоз
    // Например, добавление пользователя в соответствующую команду клоза

    const newUser = { username, rating, role };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

