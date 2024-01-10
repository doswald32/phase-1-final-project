function renderPlayers(player){
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
};

function getTeamPlayers(team) {
    fetch(`http://127.0.0.1:3000/${team}`)
    .then(res => res.json())
    .then(teamData => teamData.forEach(player => renderPlayers(player)))
};

function getTeamStats(team) {
    let teamPoints = 0;
    let teamAssists = 0;
    let teamRebounds = 0;
    let teamAge = 0;
    let teamSalary = 0;
    fetch(`http://127.0.0.1:3000/${team}`)
    .then(res => res.json())
    .then(function(teamData){
        teamData.forEach(function(player){
            teamPoints = teamPoints + player.ppg;
            teamAssists += player.apg;
            teamRebounds += player.rpg;
            teamAge += player.age;
            teamSalary += player.salary;
        });
        let teamStats = document.createElement('div');
        teamStats.innerHTML = `
        <div class="stats-container borders">
            <p>Team: ${team}</p>
            <p>Average age: ${(Math.round(teamAge / teamData.length))}</p>
            <p>Stats - ppg: ${(Math.round(teamPoints * 100) / 100)}, apg: ${(Math.round(teamAssists * 100) / 100)}, rpg: ${(Math.round(teamRebounds * 100) / 100)}</p>
            <p>Team Salary: $${(Math.round(teamSalary * 100) / 100)}M</p>
        </div>
        `
        //add team stats to DOM
        let statsWindow = document.querySelector('.team-stats');
        statsWindow.appendChild(teamStats);
        });
};

// getTeamPlayers('Pistons');
// getTeamStats('Pistons');

const teamSelector = document.getElementById("team-selector-1");
formSelector.addEventListener('')
