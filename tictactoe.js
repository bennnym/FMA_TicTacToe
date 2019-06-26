// Tic Tac Toe, FMA Application Challenge

const inquirer = require('inquirer');

let moveSuccess = false;

const board = {
  1: {
      1: ' ',
      2: ' ',
      3: ' '
    },
  2: {
      1: ' ',
      2: ' ',
      3: ' '
  },
  3: {
      1: ' ',
      2: ' ',
      3: ' '
  }
}

const displayBoard = () => {
  console.log(
    '\n' + 
    ` ${ board[1][1] } | ${ board[1][2] } | ${ board[1][3] }` + '\n' +
    ' ---------' + '\n' +
    ` ${ board[2][1] } | ${ board[2][2] } | ${ board[2][3] }` + '\n' +
    ' ---------' + '\n' +
    ` ${ board[3][1] } | ${ board[3][2] } | ${ board[3][3] }` + '\n'
  );
};

const changeMarker = ( marker ) => marker === 'X' ? 'O' : 'X'

const changeTurn = ( turn ) => turn === 1 ? 2 : 1;

// provide the board obj as input and return a boolean for the outcome of the board.
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
    if ( moves.length === 1 && moves[ 0 ] !== ' ' ) {
      winner = true;
    } 
  })
  return winner
}

const checkForDraw = () => {
  let draw = true;

  for ( let row in board ) {

    for ( let pos in board[ row ] ) {
      // if there is an empty space then it can't be a draw
      if ( board[ row ][ pos ] === ' ' ) {
        return false;
      };
    };
  };
  return draw;
}

// returns true if the space is available
const checkEmptySpace = ( x, y ) => board[ x ][ y ] === ' ';

// places the marker
const placeMarker = ( x, y, marker ) => {
  moveSuccess = true;
  return board[ x ][ y ] = marker
}

const validateInput = ( num ) => {
  if (isNaN(num)) {
    return false
  }
  // coordinates must be in the range of 1 - 3
  if (num >= 4 || num <= 0) {
    return false
  }
  return true
}

const validateMove = ( coordinates, marker ) => {
  // this is the valid format of the coordinates input
  if ( coordinates.length === 3 && coordinates[1] === ',' ) {

    coordinates = coordinates.split(',')
    var x = coordinates[ 0 ]
    var y = coordinates[ 1 ]
  }
  // check if the input is ok
  if ( validateInput( x ) && validateInput( y ) ) {
    // check if the space is available
    if ( checkEmptySpace( x, y ) ) {
      placeMarker( x, y, marker )
      return "Move accepted, here's the current board:"
    } 
    else {
      return "Oh no, a piece is already at this position!" + "\n" + "Here is the board:"
    }
  } 
  else {
    return "Sorry, I don't recognize those coordinates, they must be in the format of x,y. Try again..." + "\n" + "Here is the current board:"
  }
  // check if they entered a q
}

const playGame = ( player=1, marker='X' ) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'coordinates',
          message: `Player ${ player } enter a coord x,y to place your "${ marker }" or enter 'q' to give up:`
        }
      ])
      .then(input => {
        const { coordinates } = input 

        if ( coordinates === 'q' ) {
          return 
        }

        console.log(validateMove( coordinates, marker ));
        displayBoard()

        if ( moveSuccess ) {
          if ( checkForDraw() ) {
            return console.log('The game is a draw! Exiting Game...');
          }
          else if ( checkForWin() ) {
            return console.log(`Congratulations player ${ player }, you have won! Exiting game... `);
          }
          // reset for the next move
          moveSuccess = false; 
          // switches to the next player
          return playGame( changeTurn(player), changeMarker(marker) )
        }

       return playGame( player, marker )

      });
};

playGame()
