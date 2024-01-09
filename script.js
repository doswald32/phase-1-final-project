//DOM Render Functions
function renderOnePlayer(player){
    //build player card
    let card = document.createElement('li');
    card.className = 'card';
    //NEED TO UPDATE FORM ACTION WITH APPROPRIATE URL
    card.innerHTML = `
    <div class="card-container borders">
        <img id="player-image" src="${player.imageURL}">
        <form action="http://www.example.com/profile.php">
            <input id="player-select-checkbox" type="checkbox" name="player-select" value="player-select" />
        </form>
        <div class="card-content">
            <p id="player-name">${player.name}, ${player.position}, Age: ${player.age}</p>
            <p>${player.ppg}ppg, ${player.apg}apg, ${player.rpg}rpg, Salary: $${player.salary}M</p>
        </div>
    </div>
    `
    //add player card to DOM
    let playerWindow = document.querySelector('.player-window');
    playerWindow.appendChild(card);
}

function getTeamPlayers() {
    fetch("http://127.0.0.1:3000/bulls")
    .then(res => res.json())
    .then(teamData => teamData.forEach(player => renderOnePlayer(player)))
}

//initial render
function initialize() {
    getTeamPlayers();
}

initialize();