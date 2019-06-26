// Tic Tac Toe, FMA Application Challenge.

const inquirer = require('inquirer');
const colors = require('colors');

let moveSuccess = false;

const board = {
  1: {
      1: '   ',
      2: '   ',
      3: '   '
    },
  2: {
      1: '   ',
      2: '   ',
      3: '   '
  },
  3: {
      1: '   ',
      2: '   ',
      3: '   '
  }
};

const clearBoard = () => {
  for ( let row in board ) {
    for ( let spot in board[ row ] ) {
      board[ row ][ spot ] = '   '
    };
  };
};

const displayBoard = () => {
  console.log(
    '\n' + 
    ` ${ board[1][1] } | ${ board[1][2] } | ${ board[1][3] }` + '\n' +
    '-----------------' + '\n' +
    ` ${ board[2][1] } | ${ board[2][2] } | ${ board[2][3] }` + '\n' +
    '-----------------' + '\n' +
    ` ${ board[3][1] } | ${ board[3][2] } | ${ board[3][3] }` + '\n'
  );
};

const welcomeMessage = () => {
  console.log(
    "\n" +
    "Welcome to Tic Tac Toe!" + "\n" + "\n" +
    "Here's an empty board, enter the x and y coordinates" + "\n" +
    "separated by a comma with no space to place a marker." + "\n" +
    "\n" +
    " 1,1 | 1,2 | 1,3" + "\n" +
    "-----------------" + "\n" +
    " 2,1 | 2,2 | 2,3" + "\n" +
    "-----------------" + "\n" +
    " 3,1 | 3,2 | 3,3" + "\n"
  );
};

const changeMarker = ( marker ) => marker === 'X' ? 'O' : 'X';

const changeTurn = ( turn ) => turn === 1 ? 2 : 1;

// provide the board obj as input and return a boolean for the win outcome of the board.
const checkForWin = () => {
  let winner = false;
  const winCombos = [
      // horizontal
     [ board[1][1], board[1][2], board[1][3] ], 
     [ board[2][1], board[2][2], board[2][3] ],
     [ board[3][1], board[3][2], board[3][3] ],
     // vertical
     [ board[1][1], board[2][1], board[3][1] ],
     [ board[1][2], board[2][2], board[3][2] ],
     [ board[1][3], board[2][3], board[3][3] ],
     // diagonal
     [ board[1][1], board[2][2], board[3][3] ],
     [ board[1][3], board[2][2], board[3][1] ]
  ]

  winCombos.forEach( combo => {
    // removes duplicaes from the combo
    const moves = [ ...new Set( combo ) ]
    
    // if condition is met we know all board positions are either X or O
    if ( moves.length === 1 && moves[ 0 ] !== '   ' ) {
       winner = true;
    };
  });
  return winner;
};
// returns a boolean as to the draw status of the game
const checkForDraw = () => {

  for ( let row in board ) {

    for ( let pos in board[ row ] ) {
      // if there is an empty space then it can't be a draw
      if ( board[ row ][ pos ] === '   ' ) {
        return false;
      };
    };
  };
  return true;
};

// returns true if the space is available
const checkEmptySpace = ( x, y ) => board[ x ][ y ] === '   ';

// places the marker
const placeMarker = ( x, y, marker ) => {
  moveSuccess = true;
  return board[ x ][ y ] = ` ${ marker } `
};

const validateInput = ( num ) => {
  if (isNaN(num)) {
    return false;
  }
  // coordinates must be in the range of 1 - 3
  if (num >= 4 || num <= 0) {
    return false;
  };

  return true;
};

const validateMove = ( coordinates, marker ) => {
  // this is the valid format of the coordinates input
  if ( coordinates.length === 3 && coordinates[ 1 ] === ',' ) {

    coordinates = coordinates.split(',')
    var x = coordinates[ 0 ]
    var y = coordinates[ 1 ]
  };
  // check if the input is ok
  if ( validateInput( x ) && validateInput( y ) ) {
    // check if the space is available
    if ( checkEmptySpace( x, y ) ) {
      placeMarker( x, y, marker )
      return colors.green("Move accepted, here's the current board:")
    } 
    else {
      return colors.red("Oh no, a piece is already at that position!, Try again." + "\n" + "Here is the board:")
    }
  } 
  else {
    return colors.red("Sorry, I don't recognize those coordinates," + "\n" + "they must be in the format of x,y. Try again." + "\n" + "Here is the current board:")
  }
};

const playAgain = () => {
  inquirer
    .prompt(
      {
        type: 'input',
        name: 'answer',
        message: 'Play Again? (y/n)'
      }
    )
    .then(input => {
      const { answer } = input;
      // reset for the next move in case the player wants to play again
      moveSuccess = false; 

      if ( answer.trim().toLowerCase() === 'y' ) {
        clearBoard();
        welcomeMessage();
        playGame();
      } 
      else if ( answer.trim().toLowerCase() === 'n' ) {
        return
      } 
      else {
        console.log("Sorry I don't regonize that answer");
        return playAgain();
      }
    });
};

const playGame = ( player=1, marker='X' ) => {
    inquirer
      .prompt(
        {
          type: 'input',
          name: 'coordinates',
          message: `Player ${ player } enter a coord x,y to place your "${ marker }" or enter 'q' to give up:`
        }
      )
      .then(input => {
        const { coordinates } = input ;
        // exit the program
        if ( coordinates.trim() === 'q' ) {
          return 
        }

        console.log(validateMove( coordinates.trim(), marker ));
        displayBoard()

        if ( moveSuccess ) {
          if (checkForWin()) {
            console.log(colors.yellow(`Congratulations player ${player} you have won!`));
            return playAgain()
          }
          else if ( checkForDraw() ) {
            console.log(colors.blue('The game is a draw! Exiting Game...'));
            return playAgain();
          }
          // reset for the next move
          moveSuccess = false; 
          // switches to the next player
          return playGame( changeTurn(player), changeMarker(marker) )
        }

       return playGame( player, marker )

      });
};

welcomeMessage();
playGame();
