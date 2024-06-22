const initRandomMines = require('./initRandomMines');
const getAdjacentValues = require('./getAdjacentValues');

/**
 *
 * @param {Array of Arrays} board
 * @param {Number} mineCount
 * @returns
 */
const initBoard = function (board, mineCount) {
  let newBoard = [];
  let matrix = board.length;

  for (let r = 0; r < matrix; r++) {
    newBoard.push([]);
    for (let c = 0; c < matrix; c++) {
      newBoard[r][c] = {
        row: r,
        col: c,
        isMine: false,
        position: r.toString() + c.toString(),
        value: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
        adjacentValues: [],
      };
    }
  }

  initRandomMines(newBoard, matrix, mineCount);

  return getAdjacentPositions(newBoard, matrix);
};

const defaultSquare = {
  row: null,
  col: null,
  isMine: false,
  position: '',
  value: 0,
  isRevealed: false,
  isEmpty: false,
  isFlagged: false,
  adjacentValues: [],
};

function getMineCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomIndex(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );
}

// const defaultGameSettings = {
//   easy: {
//     length: 8,
//     mines: 8,
//     time: '8:00',
//   },
//   medium: {
//     length: 20,
//     mines: 25,
//     time: '10:00',
//   },
//   hard: {
//     length: 30,
//     mines: 38,
//     time: '12:00',
//   },
// };

const defaultGameStatus = {
  gameId: 0,
  length: 8,
  // mineCount: 10, //dependant upon settings
  mineCount: 8,
  minesFlagged: 0,
  inGame: false,
  hasWon: false,
  hasLost: false,
  time: '8:00',
  difficulty: 'easy',
};

const defaultGameboard = Array(defaultGameStatus.length).fill(
  Array(defaultGameStatus.length).fill(defaultSquare)
);

// console.log('defaultGameboard:', defaultGameboard);

const board = initBoard(defaultGameboard, defaultGameStatus.mineCount);

console.log('board:', board[7][2]);

module.exports = { initBoard, board };
