//DOM Render Functions
function renderOnePlayer(player){
    //build player card
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <img src="${player.imageURL}">
    <div class="card-content">
        <p>${player.name}, ${player.position}, Age: ${player.age}</p>
        <p>ppg: ${player.ppg} apg: ${player.apg} rpg: ${player.rpg} Annual Salary: $${player.salary} million</p>
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