document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const playersTable = document.getElementById('players-table');
    const playersList = document.getElementById('players-list');
    const startEventBtn = document.getElementById('start-event-btn');
    const kickBtn = document.getElementById('kick-btn');
    const clearBtn = document.getElementById('clear-btn');

    let playerCount = 0; // Добавляем счетчик игроков

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const rating = document.getElementById('rating').value;
        const role = document.getElementById('role').value;

        if (playerCount >= 10) { // Проверяем количество игроков
            alert('Maximum number of players reached.');
            return;
        }

        const newRow = playersTable.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.textContent = username;
        cell2.textContent = role;
        cell3.textContent = rating;
        
        playerCount++; // Увеличиваем счетчик игроков
        clearForm();
    });

    startEventBtn.addEventListener('click', function() {
        const players = Array.from(playersTable.rows).slice(1);
        if (players.length !== 10) {
            alert('The event must have exactly 10 players.');
            return;
        }

        // Логика деления игроков на команды

        // Очистка таблицы игроков
        playersTable.innerHTML = '<thead><tr><th>Username</th><th>Role</th><th>Rating</th></tr></thead>';
        playerCount = 0; // Сбрасываем счетчик игроков
    });

    kickBtn.addEventListener('click', function() {
        // Логика для кика игрока из таблицы
    });

    clearBtn.addEventListener('click', function() {
        playersTable.innerHTML = '<thead><tr><th>Username</th><th>Role</th><th>Rating</th></tr></thead>';
        playerCount = 0; // Сбрасываем счетчик игроков
    });

    function clearForm() {
        document.getElementById('username').value = '';
        document.getElementById('rating').value = '';
        document.getElementById('role').value = '';
    }
});


