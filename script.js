function renderPlayers(team, player, num){
    //build player card
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <div class="card-container">
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
    fetch(`http://localhost:3000/${team}`)
    .then(res => res.json())
    .then(teamData => {
        teamData.forEach(player => {
            renderPlayers(team, player, num)
    })})
};

function getTeamStats(team, num) {
    let teamPoints = 0;
    let teamAssists = 0;
    let teamRebounds = 0;
    let teamAge = 0;
    let teamSalary = 0;
    fetch(`http://localhost:3000/${team}`)
    .then(res => res.json())
    .then(function(teamData){
        teamData.forEach(player => {
            teamPoints += player.ppg;
            teamAssists += player.apg;
            teamRebounds += player.rpg;
            teamAge += player.age;
            teamSalary += player.salary;
        });
        let teamStats = document.createElement('div');
        teamStats.innerHTML = `
        <div class="stats-container">
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
teamSelectorOne.addEventListener("change",(e, team, num = 1) => {
    team = e.target.value;
    let statsWindow = document.querySelector(`#team-stats-${num}`);
    statsWindow.innerHTML = '';
    getTeamPlayers(team, num);
    let playerWindow = document.querySelector(`#player-window-${num}`);
    playerWindow.innerHTML = '';
    getTeamStats(team, num);
});

const teamSelectorTwo = document.querySelector("#select-2");
teamSelectorTwo.addEventListener("change",(e, team, num = 2) => {
    team = e.target.value;
    let statsWindow = document.querySelector(`#team-stats-${num}`);
    statsWindow.innerHTML = '';
    getTeamPlayers(team, num);
    let playerWindow = document.querySelector(`#player-window-${num}`);
    playerWindow.innerHTML = '';
    getTeamStats(team, num);
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
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
        let playerSalary = checkbox.parentElement.parentElement.querySelector("#salary").textContent;
        let playerSalaryInt = parseFloat2Decimals(playerSalary);
        teamOneSalary += playerSalaryInt;
        if (checkbox.checked === true) {
            teamOneSalaryToTrade += playerSalaryInt;
    }};
    for (let checkbox of teamTwoCheckboxes) {
        let playerSalary = checkbox.parentElement.parentElement.querySelector("#salary").textContent;
        let playerSalaryInt = parseFloat2Decimals(playerSalary);
        teamTwoSalary += playerSalaryInt;
        if (checkbox.checked === true) {
            teamTwoSalaryToTrade += playerSalaryInt;
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

//function to add two decimal places to a number in another function
function parseFloat2Decimals(string){
    return parseFloat(parseFloat(string).toFixed(2));
};

// Reset simulator by pressing 'Reset Simulator' button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click', () => {
    const teamSelectors = document.querySelectorAll(".team-selector");
    teamSelectors.forEach((element) => element.reset());
    const playerWindows = document.querySelectorAll(".player-window");
    playerWindows.forEach((element) => element.innerHTML = '');
    const statsWindows = document.querySelectorAll(".team-stats");
    statsWindows.forEach((element) => element.innerHTML = '');
    const tradeBlockOne = document.getElementById("trade-block-1");
    tradeBlockOne.innerHTML = '';
    const tradeBlockTwo = document.getElementById('trade-block-2');
    tradeBlockTwo.innerHTML = '';
    const tradeDetails = document.getElementById('trade-details');
    tradeDetails.innerHTML = '';
    const tradeResponse = document.getElementById('trade-response');
    tradeResponse.innerHTML = '';
});

//Changing color of title by hovering with mouse
let title = document.querySelector("#title");
title.addEventListener("mouseover", (e) => {
    e.target.style.color='blue';
});
title.addEventListener("mouseout", (e) => {
    e.target.style.color='black';
});

