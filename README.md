# NBA Trade Simulator

## Overview

The NBA Trade Simulator allows you to execute a trade between two of the five teams in the NBA's Central Division. Once team and player selections are made and a trade attempt is executed, the trade simulator will let you know if the proposed trade is valid or not based upon an individual team's salary cap maximum of $190 million. 

## Requirements to use the simulator

The NBA Trade Simulator uses a json file to simulate communication with a server. In order to use the simulator, you'll need to have json-server installed on your local machine. If you do not have json-server installed, you can find instructions on how to do so here: [Link] (https://www.npmjs.com/package/json-server)

Once you have json-server installed, you'll want to open the index.html file in your browser and the following command in your terminal or VSCode: 
```python
json-server --watch db.json
```

From there, you can start interacting with the page in your browser. 

## Using the simulator

Once you've opened the index.html file and are running the json server, you'll notice two distinct windows in your browser. Each window is used to populate players of a team. Above each window, you'll see a dropdown list. This is the team selection. Be sure to select two different teams to execute a trade. If the same team is chosen in both windows and a trade is executed, you'll see an alert message saying, "Please choose two different teams to execute a trade". Once two teams are chosen, you can click the check boxes in the top right corner of each players respective 'player card'. Once the selected players are chosen, press the 'Enter' key to execute the trade. If the trade is successful, meaning that both teams were below the $190 million salary cap max at the conclusion of the trade, you'll see a message in the middle of your screen that says, "Trade successful!". If one of the two teams ends up ABOVE the $190 million salary cap, you'll see a message saying, "Trade unsuccessful. The trade must result in both teams must being below the $190M salary cap. Please make another selection." Either reset the simulator using the 'Reset Simulator' button or make a different selection and try again. 

## Contributions

All player images are from ESPN
