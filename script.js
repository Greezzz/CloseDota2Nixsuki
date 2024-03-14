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

function register() {
    if (eventEnded) {
        alert('Event has ended. Registration is closed.');
        return;
    }

    const usernameInput = document.getElementById('username');
    const ratingInput = document.getElementById('rating');
    const username = usernameInput.value.trim();
    const rating = parseInt(ratingInput.value.trim());
    
    if (username !== '' && !isNaN(rating)) {
        playersRef.push({name: username, rating: rating});
        usernameInput.value = '';
        ratingInput.value = '';
    } else {
        alert('Please enter valid username and rating.');
    }
}

function login() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username !== '') {
        loggedInUser = username;
        alert('Logged in successfully as ' + loggedInUser + '.');
    } else {
        alert('Please enter a valid username.');
    }
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

function createEventModal() {
    document.getElementById('create-event-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('create-event-modal').style.display = 'none';
}

function createEvent() {
    const eventNameInput = document.getElementById('event-name');
    const eventName = eventNameInput.value.trim();
    
    if (eventName !== '') {
        // Здесь вы можете добавить логику создания клоза с балансировкой команд и выбором роли
        // Для примера, добавим событие в базу данных
        eventsRef.push({name: eventName, date: new Date().toLocaleString()});
        closeModal();
    } else {
        alert('Please enter a valid event name.');
    }
}

function clearPlayersList() {
    playersRef.remove();
}

function clearEvent() {
    playersRef.remove();
    eventsRef.remove();
}


