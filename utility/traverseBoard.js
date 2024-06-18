/**
This function takes y coordinate, col coordinate, and a board
and returns an array of the adjacent squares based on the col and y 
of a squares position
 */
/**
 * @param {number} row
 * @param {number} col
 * @param {Array of Arrays} board
 * @returns Array
 */
const traverseBoard = (row, col, board) => {
  const adjacentSquares = [];

  if (board[row + 1] && board[row + 1][col]) {
    adjacentSquares.push([row + 1, col]);
  }

  if (board[row - 1] && board[row - 1][col]) {
    adjacentSquares.push([row - 1, col]);
  }

  if (board[row][col + 1]) {
    adjacentSquares.push([row, col + 1]);
  }

  if (board[row][col - 1]) {
    adjacentSquares.push([row, col - 1]);
  }

  if (board[row + 1] && board[row + 1][col + 1]) {
    adjacentSquares.push([row + 1, col + 1]);
  }

  if (board[row + 1] && board[row + 1][col - 1]) {
    adjacentSquares.push([row + 1, col - 1]);
  }

  if (board[row - 1] && board[row - 1][col + 1]) {
    adjacentSquares.push([row - 1, col + 1]);
  }

  if (board[row - 1] && board[row - 1][col - 1]) {
    adjacentSquares.push([row - 1, col - 1]);
  }
  return adjacentSquares;
};

module.exports = traverseBoard;
