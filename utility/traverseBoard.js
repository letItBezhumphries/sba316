/**
This function takes a number representing a row index, col index, and a board
and returns an array of tuples where each tuple represents the indices of an adjacent square for the current square
 */
/**
 * @param {number} row
 * @param {number} col
 * @param {Array of Arrays} board
 * @returns Array of tuples in which each tuple consists of the row and col indices of an adjacent square
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
