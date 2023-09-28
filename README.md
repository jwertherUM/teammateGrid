# Welcome to Teammate Grid!
A React Native app based on the popular daily sports trivia game, Immaculate Grid

## Install Instructions
- Create a new folder in your system to house the codebase
- Navigate to this folder in your terminal, and download the code with the following command "git clone https://github.com/jwertherUM/teammateGrid.git"
- Make sure you have the React Native CLI installed. If not, follow these instructions https://reactnative.dev/docs/environment-setup
- To ensure dependencies are correctly installed, cd into teammate_grid and run "npm install"
- Now to achieve the same purpose for the backend, cd into flask_backend and run "pip install -r requirements.txt"
- Now that your files, packages, and dependencies are installed, you need to complete two actions to successfully run the app. Start up the local flask server, and start the app itself
  - To start the flask server, cd into the flask_backend directory and run the command "python3 app.py"
  - Do not attempt to interact with the application until you see "Debugger Active" in the terminal
  - Now, get the React Native application running on an ios simulator on your device
    - Open another terminal window
    - Enter the directory teammate_grid
    - Run "npx react-native run-ios"
- At this point, you should see the registration screen after about one minute. Happy playing!

## Game Instructions/Objective
Every user must begin by registering, this way the game can keep track of your high scores! You will be prompted to give a username and password. Enter these and continue to login:
<br><br>
![Screenshot 2023-09-28 at 1 24 03 PM](https://github.com/jwertherUM/teammateGrid/assets/55903014/9a7a0efe-5693-46bf-b2ce-dbb4032b0044)
![Screenshot 2023-09-28 at 1 24 12 PM](https://github.com/jwertherUM/teammateGrid/assets/55903014/43ce60d7-893a-4535-8610-b89f88f20f73)
<br><br>
Upon logging in, a player has 9 guesses to complete the Teammate Grid in a given game, beginning with an empty grid. To guess, select a square on the grid. This square is representative of the player in the corresponding outer row/column. Search for a player in the search bar above, and select their name if you believe your searched player has been a teammate of both outer players.
<br><br>
![Screenshot 2023-09-28 at 1 24 25 PM](https://github.com/jwertherUM/teammateGrid/assets/55903014/96cbd42c-a638-401e-b0f3-76eeb0bb1660)
![Screenshot 2023-09-28 at 1 39 06 PM](https://github.com/jwertherUM/teammateGrid/assets/55903014/105acc4e-299d-4744-87b9-b874833e77d7)
![Screenshot 2023-09-28 at 1 35 09 PM](https://github.com/jwertherUM/teammateGrid/assets/55903014/638250f8-6e46-45a4-8d5b-16f1bfda3090)
<br><br>
Keep playing until you run out of guesses, at that point, you will see a game-over popup. This will give you the option to start the game over and see if you cracked your high score!
<br><br>
![Screenshot 2023-09-28 at 1 35 33 PM](https://github.com/jwertherUM/teammateGrid/assets/55903014/4353dbcf-a65b-4cf7-bbf2-9992bfc3f5cf)

# Enjoy!
