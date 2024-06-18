const traverseBoard = require('./traverseBoard');

function revealEmptySquares(r, c, board) {
  let selected = board[r][c];
  console.log('inside revealEmptySquares given board', selected);
  //iterate over the neighborValues
  const { row, col, adjacentValues } = selected;
  let emptySquares = [...adjacentValues];
  console.log('emptySquares', emptySquares);

  emptySquares.map((neighbor) => {
    //   let { isFlagged, isRevealed, isEmpty, isMine, xAxis, yAxis } = neighbor;
    //   if (!isRevealed && (isEmpty || !isMine)) {
    //     let newSquare = board[yAxis][xAxis];
    //     console.log('newSquare', newSquare);
    //     newSquare.isRevealed = !isRevealed;
    //     if (newSquare.isEmpty) {
    //       revealEmptySquares(newSquare.yAxis, newSquare.xAxis, board)
    //     }
    //   }
  });
  console.log('inside revealEmptySquares this should be returned =>', board);
  return board;
}

module.exports = revealEmptySquares;
