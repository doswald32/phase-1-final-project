//DOM Render Functions
function renderOnePlayer(player){
    //build player card
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <img src="${player.imageURL}">
    <div class="content">
        <h4>${player.name}</h4>
        <h4>${player.position}</h4>
        <h4>${player.age}</h4>
        <h4>${player.salary}</h4>
        <h2>${player.ppg}</h2>
        <h2>${player.apg}</h2>
        <h2>${player.rpg}</h2>
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