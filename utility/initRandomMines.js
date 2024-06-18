/**
 *
 * @param {Number} min
 * @param {Number} max
 * @returns Number
 */
function getRandomNum(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );
}

/**
 *
 * @param {Nested Array} board
 * @param {Number} matrix
 * @param {Number} mines
 * @returns board
 */
const initRandomMines = function (board, matrix, mines) {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    let row = getRandomNum(0, matrix - 1);
    let col = getRandomNum(0, matrix - 1);
    let location = board[row][col];

    if (!location.isMine) {
      location.isMine = true;
      minesPlanted++;
    }
  }

  return board;
};

module.exports = initRandomMines;
