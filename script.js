const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Массив для хранения данных
let users = [];

// Middleware для обработки POST запросов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Обработчик регистрации пользователей
app.post('/register', (req, res) => {
    const { username, rating } = req.body;
    
    // Добавление пользователя в массив
    users.push({ username, rating });
    
    // Отправка обновленного списка онлайн пользователей всем клиентам
    io.emit('updateOnlineUsers', users);
    
    res.status(200).send('User registered successfully');
});

// Подключение к сокету при запуске сервера
io.on('connection', socket => {
    // Отправка обновленного списка онлайн пользователей новому клиенту
    socket.emit('updateOnlineUsers', users);
});

// Прослушивание порта
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
