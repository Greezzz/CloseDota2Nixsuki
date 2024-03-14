// Инициализация Firebase
const firebaseConfig = {
    // Ваш конфиг Firebase
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let playersRef = database.ref('players');
let eventsRef = database.ref('events');

let players = [];
let events = [];
let eventEnded = false;
let closerMaker = null;
let loggedInUser = null;

playersRef.on('value', snapshot => {
    players = [];
    snapshot.forEach(childSnapshot => {
        let player = childSnapshot.val();
        players.push(player);
    });
    updatePlayersList();
});

eventsRef.on('value', snapshot => {
    events = [];
    snapshot.forEach(childSnapshot => {
        let event = childSnapshot.val();
        events.push(event);
    });
    updateEventsList();
});

function openRegisterModal() {
    document.getElementById('register-modal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('register-modal').style.display = 'none';
}

function registerUser() {
    const usernameInput = document.getElementById('username');
    const ratingInput = document.getElementById('rating');
    const username = usernameInput.value.trim();
    const rating = parseInt(ratingInput.value.trim());
    
    if (username !== '' && !isNaN(rating)) {
        playersRef.push({name: username, rating: rating});
        usernameInput.value = '';
        ratingInput.value = '';
        closeRegisterModal();
    } else {
        alert('Please enter valid username and rating.');
    }
}

function login() {
    // Реализация входа
    alert('Login functionality will be implemented here.');
}

function updatePlayersList() {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    
    players.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.name}</td><td>${player.rating}</td>`;
        playersList.appendChild(row);
    });
}

function updateEventsList() {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';
    
    events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${event.name}</td><td>${event.date}</td>`;
        eventsList.appendChild(row);
    });
}

// Остальной код остается без изменений

