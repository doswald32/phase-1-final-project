function renderPlayers(team, player, num){
    //build player card
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <div class="card-container borders">
        <img id="player-image" src="${player.imageURL}">
        <form id="checkbox">
            <input id="${team}-player-select-checkbox-${player.id}" class="${team}-player-select-checkbox player-select-checkbox" type="checkbox" name="player-select" value="player-select" />
        </form>
        <div class="card-content">
            <p>${player.name}, ${player.position}, Age: ${player.age}</p>
            <p>${player.ppg}ppg, ${player.apg}apg, ${player.rpg}rpg, Salary: $<span id="salary">${player.salary}</span>M</p>
        </div>
    </div>
    `
    //add player card to DOM
    let playerWindow = document.querySelector(`#player-window-${num}`);
    playerWindow.appendChild(card);
};

function getTeamPlayers(team, num) {
    fetch(`http://127.0.0.1:3000/${team}`)
    .then(res => res.json())
    .then(teamData => teamData.forEach(player => renderPlayers(team, player, num)))
};

function getTeamStats(team, num) {
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
        let statsWindow = document.querySelector(`#team-stats-${num}`);
        statsWindow.appendChild(teamStats);
        });
};

const teamSelectorOne = document.querySelector("#select-1");
teamSelectorOne.addEventListener("change", function(e, team, num = 1){
    team = e.target.value;
    let statsWindow = document.querySelector(`#team-stats-${num}`);
    statsWindow.innerHTML = '';
    getTeamPlayers(team, num);
    let playerWindow = document.querySelector(`#player-window-${num}`);
    playerWindow.innerHTML = '';
    getTeamStats(team, num);
});

const teamSelectorTwo = document.querySelector("#select-2");
teamSelectorTwo.addEventListener("change", function(e, team, num = 2){
    team = e.target.value;
    let statsWindow = document.querySelector(`#team-stats-${num}`);
    statsWindow.innerHTML = '';
    getTeamPlayers(team, num);
    let playerWindow = document.querySelector(`#player-window-${num}`);
    playerWindow.innerHTML = '';
    getTeamStats(team, num);
});


let tradeButton = document.getElementById("trade-button");
tradeButton.addEventListener('click', function() {
    let selectTargetOne = document.getElementById("select-1");
    let selectTargetTwo = document.getElementById("select-2");
    if (selectTargetOne.value === "Blank" || selectTargetTwo.value === "Blank") {
        alert("Please choose two different teams to execute a trade");
    return 
};
    sumOfTeamTradeSalary(selectTargetOne.value);
    sumOfTeamTradeSalary(selectTargetTwo.value);
});

function sumOfTeamTradeSalary(team) {
    let playerCheckboxes = document.querySelectorAll(`.${team}-player-select-checkbox`);
    let salaryToTrade = 0;
    for (let checkbox of playerCheckboxes) {
        if (checkbox.checked === true) {
            let playerSalary = checkbox.parentElement.parentElement.querySelector("#salary").textContent;
            let playerSalaryInt = parseInt(playerSalary);
            salaryToTrade = salaryToTrade + playerSalaryInt;
        };
    };
    if (salaryToTrade === 0) {
        alert("Please select at least one player to trade from each team");
        return;
    };
    console.log(salaryToTrade);
    return salaryToTrade;
};