let players = [];
let eventEnded = false;
let closerMaker = null;
let loggedInUser = null;

function register() {
    if (eventEnded) {
        alert('Event has ended. Registration is closed.');
        return;
    }

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const ratingInput = document.getElementById('rating');
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rating = parseInt(ratingInput.value.trim());
    
    if (username !== '' && password !== '' && !isNaN(rating)) {
        players.push({name: username, password: password, rating: rating});
        updatePlayersList();
        saveUser(username, password);
        usernameInput.value = '';
        passwordInput.value = '';
        ratingInput.value = '';
    } else {
        alert('Please enter valid username, password, and rating.');
    }
}

function saveUser(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}

function login() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === storedUsername && password === storedPassword) {
        loggedInUser = username;
        alert('Logged in successfully.');
    } else {
        alert('Invalid username or password.');
    }
}

function updatePlayersList() {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    
    players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = player.name + (player.rating !== null ? ' (Rating: ' + player.rating + ')' : '');
        playersList.appendChild(listItem);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function divideIntoTeams() {
    const team1 = document.getElementById('team1');
    const team2 = document.getElementById('team2');

    // Shuffle players array
    shuffle(players);

    // Clear previous teams
    team1.innerHTML = '';
    team2.innerHTML = '';

    // Divide players into two teams
    const middleIndex = Math.ceil(players.length / 2);
    const team1Players = players.slice(0, middleIndex);
    const team2Players = players.slice(middleIndex);

    // Display players in teams
    team1Players.forEach(player => {
        const listItem = document.createElement('div');
        listItem.textContent = player.name + (player.rating !== null ? ' (Rating: ' + player.rating + ')' : '');
        team1.appendChild(listItem);
    });

    team2Players.forEach(player => {
        const listItem = document.createElement('div');
        listItem.textContent = player.name + (player.rating !== null ? ' (Rating: ' + player.rating + ')' : '');
        team2.appendChild(listItem);
    });
}

function kickPlayer() {
    if (eventEnded) {
        alert('Event has ended. Kicking players is not allowed.');
        return;
    }

    const username = prompt('Enter username to kick:');
    const index = players.findIndex(player => player.name === username);
    
    if (index !== -1) {
        players.splice(index, 1);
        updatePlayersList();
    } else {
        alert('Player not found.');
    }
}

function inputRating() {
    const username = prompt('Enter username to input rating:');
    const rating = parseInt(prompt('Enter rating for ' + username + ':'));

    const index = players.findIndex(player => player.name === username);
    
    if (index !== -1) {
        players[index].rating = rating;
        updatePlayersList();
    } else {
        alert('Player not found.');
    }
}

function endEvent() {
    eventEnded = true;
    alert('Event has ended.');
}

function assignCloserMaker() {
    const username = prompt('Enter username to assign Closer Maker:');
    closerMaker = username;
    alert(username + ' has been assigned as Closer Maker.');
}

function removeCloserMaker() {
    closerMaker = null;
    alert('Closer Maker has been removed.');
}

function clearPlayersList() {
    players = [];
    updatePlayersList();
    clearLocalStorage();
}

function clearTeams() {
    const team1 = document.getElementById('team1');
    const team2 = document.getElementById('team2');
    team1.innerHTML = '';
    team2.innerHTML = '';
}

function clearEvent() {
    players = [];
    eventEnded = false;
    closerMaker = null;
    clearPlayersList();
    clearTeams();
}

function clearLocalStorage() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
}
