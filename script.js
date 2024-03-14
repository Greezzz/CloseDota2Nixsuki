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
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.textContent = username;
        cell2.textContent = role;
        cell3.textContent = rating;
        
        player


