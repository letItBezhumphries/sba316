const traverseBoard = require('./traverseBoard');

/** this should take in the new constructed gameboard and populate the adjacentValues for each cell on the board
 * and then return the updated board
 */
/**
 *
 * @param {Nested Array} board
 * @param {Number} matrix
 * @returns board (array) with adjacentValues added
 */
function getAdjacentValues(board, matrix) {
  let newBoard = board;
  //iterate over the newBoard checking if each sqaure is a mine
  for (var r = 0; r < matrix; r++) {
    for (var c = 0; c < matrix; c++) {
      //if it is not a mine set a starting value and declare variable to store = ?
      if (board[r][c].isMine !== true) {
        let newValue = 0;

        // store the current square location on board
        let currentSquare = board[r][c];

        // store the adjacentSquares for the currentSquare
        const adjacentSquares = traverseBoard(
          currentSquare.row,
          currentSquare.col,
          board
        );
        // update the adjacentValues for the currentSquare
        currentSquare.adjacentValues = adjacentSquares;

        //iterate over the array of adjacentSquares checking if each square is a mine
        adjacentSquares.map((adjSquare) => {
          if (board[adjSquare[0]][adjSquare[1]].isMine) {
            newValue++; // don't I need to be setting this
          }
        });
        if (newValue === 0) {
          newBoard[r][c].isEmpty = true; //empty reveal board protocol?
        }
        // console.log(newValue);
        newBoard[r][c].value = newValue;
      }
    }
  }

  return newBoard;
}

module.exports = getAdjacentValues;
