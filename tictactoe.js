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
    for ( let col in board[ row ] ) {
      board[ row ][ col ] = '   '
    };
  };
};

const displayBoard = () => {
  console.log(
  `
  ${board[1][1]} | ${board[1][2]} | ${board[1][3]}
 -----------------
  ${board[2][1]} | ${board[2][2]} | ${board[2][3]}
 -----------------
  ${board[3][1]} | ${board[3][2]} | ${board[3][3]}
  `
  );
}; 

const welcomeMessage = () => {
  console.log(
`
Welcome to Tic Tac Toe!

Here's an empty board, enter the x and y coordinates
separated by a comma with no space to place a marker.
    
  1,1 | 1,2 | 1,3
 -----------------
  2,1 | 2,2 | 2,3
 ----------------- 
  3,1 | 3,2 | 3,3
`
  );
};
// toggles between markers
const changeMarker = ( marker ) => marker === 'X' ? 'O' : 'X';
// toggles between player turns
const changeTurn = ( turn ) => turn === 1 ? 2 : 1;

// return a boolean for the win outcome of the board.
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
    // removes duplicates from the combo
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
    for ( let col in board[ row ] ) {
      // if there is an empty space then it can't be a draw
      if ( board[ row ][ col ] === '   ' ) {
        return false;
      };
    };
  };
  return true;
};

// returns true if the space is available, false if not available.
const checkEmptySpace = ( x, y ) => board[ x ][ y ] === '   ';

// places the marker
const placeMarker = ( x, y, marker ) => {
  moveSuccess = true;
  return board[ x ][ y ] = ` ${ marker } `
};

// validates individual coordinate inputs
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
// incorporates the entire logic for validating a move
const validateMove = ( coordinates, marker ) => {
  // this is the valid format of the coordinates input
  if ( coordinates.length === 3 && coordinates[ 1 ] === ',' ) {

    coordinates = coordinates.split(',')
    var [x, y] = coordinates;
  };
  // check if the input is ok
  if ( validateInput( x ) && validateInput( y ) ) {
    // check if the space is available
    if ( checkEmptySpace( x, y ) ) {
      placeMarker( x, y, marker )
      return colors.green( "Move accepted, here's the current board:" )
    } 
    else {
      return colors.red( "Oh no, a piece is already at that position!, Try again." + 
                         "\n" + "Here is the board:" )
    }
  } 
  else {
    return colors.red( "Sorry, I don't recognize those coordinates," + "\n" 
                      + "they must be in the format of x,y. Try again." + "\n"
                      + "Here is the current board:" )
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
        console.log("Sorry I don't recognize that answer");
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
            console.log( colors.yellow( `Congratulations player ${player} you have won!` ) );
            return playAgain()
          }
          else if ( checkForDraw() ) {
            console.log( colors.blue( 'The game is a draw!' ) );
            return playAgain();
          }
          // reset for the next move
          moveSuccess = false; 
          // switches to the next player
          return playGame( changeTurn( player ), changeMarker( marker ) )
        }

       return playGame( player, marker )

      });
};

welcomeMessage();
playGame();
