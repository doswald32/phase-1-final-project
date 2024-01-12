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
            <p>${player.ppg}ppg, ${player.apg}apg, ${player.rpg}rpg, Salary: $<span id="salary">${parseFloat(player.salary).toFixed(2)}</span>M</p>
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

document.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        console.log(e.key);
        let selectTargetOne = document.getElementById("select-1");
        let selectTargetTwo = document.getElementById("select-2");
        if (selectTargetOne.value === "Blank" || selectTargetTwo.value === "Blank" || selectTargetOne.value === selectTargetTwo.value) {
            alert("Please choose two different teams to execute a trade");
        return;
    };
    teamTradeSalary(selectTargetOne.value, selectTargetTwo.value);
}});
    


function teamTradeSalary(team1, team2) {
    let teamOneCheckboxes = document.querySelectorAll(`.${team1}-player-select-checkbox`);
    let teamTwoCheckboxes = document.querySelectorAll(`.${team2}-player-select-checkbox`);
    let teamOneSalary = 0.00;
    let teamTwoSalary = 0.00;
    let teamOneSalaryToTrade = 0.00;
    let teamTwoSalaryToTrade = 0.00;
    for (let checkbox of teamOneCheckboxes) {
        // if (checkbox.checked === true) {
        //     let playerSalary = checkbox.parentElement.parentElement.querySelector("#salary").textContent;
        //     let playerSalaryInt = parseInt(playerSalary);
        //     teamOneSalaryToTrade = teamOneSalaryToTrade + playerSalaryInt;
        // };
        let playerSalary = checkbox.parentElement.parentElement.querySelector("#salary").textContent;
        let playerSalaryInt = parseFloat2Decimals(playerSalary);
        teamOneSalary += playerSalaryInt;
        if (checkbox.checked === true) {
            teamOneSalaryToTrade = teamOneSalaryToTrade + playerSalaryInt;
    }};
    for (let checkbox of teamTwoCheckboxes) {
        // if (checkbox.checked === true) {
        //     let playerSalary = checkbox.parentElement.parentElement.querySelector("#salary").textContent;
        //     let playerSalaryInt = parseInt(playerSalary);
        //     teamTwoSalaryToTrade = teamTwoSalaryToTrade + playerSalaryInt;
        // };
        let playerSalary = checkbox.parentElement.parentElement.querySelector("#salary").textContent;
        let playerSalaryInt = parseFloat2Decimals(playerSalary);
        teamTwoSalary += playerSalaryInt;
        if (checkbox.checked === true) {
            teamTwoSalaryToTrade = teamTwoSalaryToTrade + playerSalaryInt;
    }};
    if (teamOneSalaryToTrade === 0 || teamTwoSalaryToTrade === 0) {
        alert("Please select at least one player to trade from each team");
        return false;
    };
        let teamOneTradeText = document.getElementById("trade-block-1");
        teamOneTradeText.innerHTML = `<b>Salary to trade:</b> $${parseFloat(teamOneSalaryToTrade).toFixed(2)}M`;
        let teamTwoTradeText = document.getElementById("trade-block-2");
        teamTwoTradeText.innerHTML = `<b>Salary to trade:</b> $${parseFloat(teamTwoSalaryToTrade).toFixed(2)}M`;

        let tradeDetails = document.getElementById("trade-details");
        let teamOnePostTradeSalary = parseFloat(teamOneSalary - teamOneSalaryToTrade + teamTwoSalaryToTrade).toFixed(2);
        let teamTwoPostTradeSalary = parseFloat(teamTwoSalary - teamTwoSalaryToTrade + teamOneSalaryToTrade).toFixed(2);
        tradeDetails.innerHTML = `
        <table id="table" class="borders">
            <tr>
                <td>&nbsp;</td>
                <th><u>Team 1</u></th>
                <th><u>Team 2</u></th>
            </tr>
            <tr>
                <th>Pre-trade salary:</th>
                <td>$${parseFloat(teamOneSalary).toFixed(2)}M</td>
                <td>$${parseFloat(teamTwoSalary).toFixed(2)}M</td>
            </tr>
            <tr>
                <th>Post-trade salary:</th>
                <td>$${teamOnePostTradeSalary}M</td>
                <td>$${teamTwoPostTradeSalary}M</td>
            </tr>
        </table>
        `;

        let tradeResponse = document.getElementById("trade-response");
        if (teamOnePostTradeSalary > 190 || teamTwoPostTradeSalary > 190) {
            tradeResponse.textContent = "Trade unsuccessful. The trade must result in both teams must being below the $190M salary cap. Please make another selection.";
        } else {
            tradeResponse.textContent = "Trade successful!";
        };
};

function parseFloat2Decimals(string){
    return parseFloat(parseFloat(string).toFixed(2));
};

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click', () => window.location.reload());

let title = document.querySelector("#title");
title.addEventListener("mouseover", function(e) {
    e.target.style.color='blue';
});
title.addEventListener("mouseout", function(e) {
    e.target.style.color='black';
});

