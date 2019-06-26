# Tic Tac Toe in the Console

### Game set up

**Assumption**

Users wanting to play this game have prior knowledge of git, the console and node.js and have all installed on their operating system.

*For more information on getting started with git, please see here:*

[Getting started with Git and GitHub: the complete beginner’s guide](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6).

*For more information on navigating the command line (also known as the terminal and console) please see here:*

**Mac** - [A Beginner's Guide to Using the Mac Terminal](https://www.makeuseof.com/tag/beginners-guide-mac-terminal/)

**Windows** - [A Beginner's Guide To The Windows Command Line](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/)

*For more information on Node.js please see here:*

[Node.js](https://nodejs.org/en/)

#### Mac
- Press `⌘ + spacebar`. This will initiate the spotlight search.

- Input `terminal` and click on the terminal program which is returned as the `top hit`

- Once in the terminal application type `git clone https://github.com/bennnym/FMA_TicTacToe.git` and press `↩`. This clones the tic-tac-toe repository onto the user's computer.

- Now enter into the terminal `cd FMA_TicTacToe` and press `↩`. This navigates into the newly created folder.

- We now need to install the required packages to run the game. In the terminal enter `npm install` and press `↩`.

- Now enter `npm run game` and press `↩` and enjoy the game!

#### Windows
- Press `❖ ` (windows key) or `❖ + R` and type in `cmd`.

- In the `command prompt` type `git  clone https://github.com/bennnym/FMA_TicTacToe.git` and press `↩`.

- Open the `command prompt` program and navigate into the newly created folder by typing `cd FMA_TicTacToe` and hitting `↩`.

- Enter `npm install` and press `↩`.

- Now enter `npm run game` and press `↩` and enjoy the game!

### Game Rules
1. The game is played on a grid that is 3 x 3 squares.

2. Two players are required for a game.

3. Player 1 always starts the game and assumes the marker "X".

4. Players take turns to play until a player wins, or the end of the game (whichever happens first).

5. The first player to get three of their markers in a row (vertically, horizontally or diagonally) is the winner.

6. If all 9 squares are full and no player has won, the game ends in a draw.

7. To input a marker the player must enter the `x` and `y` coordinates of the position they wish to place the marker. Like so:


```
 1,1 | 1,2 | 1,3
 ---------------
 2,1 | 2,2 | 2,3
 ---------------
 3,1 | 3,2 | 3,3
```
### Solution Execution
- The solution to the tic-tac-toe problem was purposefully executed with clear variable and function names. With a deliberate effort to make the code as readable as possible.

- Individual functions were written for all actions required within the game play. Such as placing a marker, checking if there is a winner or a draw, checking if the space is available, clearing the board, displaying the board and validating user input.

- All of these functions are tied in together with the use of the `inquirer` node package in order to receive user input from the console.

- The combination of the welcomeMessage, playGame and playAgain functions navigate a tic-tac-toe game in a somewhat recursive solution where the players have power over how long the game runs according to their input. If the player decides to continue playing, the game continues and if the player decides to give up or finish playing the code exits and the game is over.

