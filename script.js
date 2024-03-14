document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const playersTable = document.getElementById('players-table');
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
        const cell0 = newRow.insertCell(0);
        const cell1 = newRow.insertCell(1);
        const cell2 = newRow.insertCell(2);
        const cell3 = newRow.insertCell(3);
        cell0.textContent = playerCount + 1; // Нумерация игроков
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
        const shuffledPlayers = players.sort(() => Math.random() - 0.5); // Перемешиваем игроков
        const team1 = shuffledPlayers.slice(0, 5);
        const team2 = shuffledPlayers.slice(5);

        console.log('Team 1:', team1);
        console.log('Team 2:', team2);

        // Очистка таблицы игроков
        playersTable.innerHTML = '<thead><tr><th>#</th><th>Username</th><th>Role</th><th>Rating</th></tr></thead>';
        playerCount = 0; // Сбрасываем счетчик игроков
    });

    kickBtn.addEventListener('click', function() {
        // Получаем выбранную строку таблицы
        const selectedRow = playersTable.querySelector('tr.selected');
        if (!selectedRow) {
            alert('Please select a player to kick.');
            return;
        }
        // Удаляем выбранного игрока из таблицы
        selectedRow.remove();
        playerCount--; // Уменьшаем счетчик игроков
    });

    clearBtn.addEventListener('click', function() {
        playersTable.innerHTML = '<thead><tr><th>#</th><th>Username</th><th>Role</th><th>Rating</th></tr></thead>';
        playerCount = 0; // Сбрасываем счетчик игроков
    });

    function clearForm() {
        document.getElementById('username').value = '';
        document.getElementById('rating').value = '';
        document.getElementById('role').value = '';
    }

    // Добавляем обработчик для выделения строки при клике на нее
    playersTable.addEventListener('click', function(event) {
        const selectedRow = event.target.parentElement;
        if (selectedRow.tagName === 'TR') {
            if (selectedRow.classList.contains('selected')) {
                selectedRow.classList.remove('selected');
            } else {
                selectedRow.classList.add('selected');
            }
        }
    });
});
