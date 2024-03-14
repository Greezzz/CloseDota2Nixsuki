const socket = io(); // Подключение к серверу с помощью socket.io

function register() {
    const username = document.getElementById('username').value;
    const rating = document.getElementById('rating').value;
    
    // Отправка данных на сервер для регистрации
    socket.emit('register', { username, rating });
}

function createEvent() {
    const eventName = document.getElementById('event-name').value;
    
    // Отправка данных на сервер для создания ивента
    socket.emit('createEvent', { eventName });
}

// Обновление списка онлайн пользователей
socket.on('updateOnlineUsers', onlineUsers => {
    const onlineUsersList = document.getElementById('online-users');
    onlineUsersList.innerHTML = '';
    
    onlineUsers.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.username;
        onlineUsersList.appendChild(listItem);
    });
});

