/**
This function takes a number representing a row index, col number representing a column index, and a board
and returns an array of tuples where each tuple represents the indices of an adjacent square that needs to be checked
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

  // console.log('newBoard:', newBoard);
  initRandomMines(newBoard, matrix, mineCount);

  return getAdjacentValues(newBoard, matrix);
};

/**
 * Below is the game state and square state
 */
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

function getPercentage(num) {
  let numStr = num.toString().split('.')[1].slice(0, 3);
  let percentage = numStr.slice(0, 2) + '.' + numStr[numStr.length - 1] + '%';

  // if (parseInt(numStr[numStr.length - 1]) >= 5) {
  //   // round up
  //   numStr = num.toString().split('.')[1].slice(0, 2);
  //   let number = parseInt(numStr) + 1;
  //   percentage = number.toString() + '%';
  // } else {
  //   percentage = numStr.slice(0, 2) + '%';
  // }

  if (percentage[0] === '0') {
    return percentage.slice(1);
  }

  return percentage;
}

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

const board = initBoard(defaultGameboard, defaultGameStatus.mineCount);

console.log('initialized gameboard:', board);

const navElem = document.getElementsByTagName('nav')[0];
navElem.style.height = '20%';
navElem.style.color = 'whitesmoke';
navElem.style.width = 'var(--page-content-width)';
navElem.style.display = 'flex';
navElem.style.margin = '0 auto';
navElem.style.justifyContent = 'center';
navElem.style.alignItems = 'center';

const headingElem = document.querySelector('nav h2');
headingElem.style.height = '100%';
headingElem.style.marginRight = '30px';
headingElem.style.width = '40%';
headingElem.style.display = 'flex';
headingElem.style.alignItems = 'center';

const playBtn = document.querySelector('.play-btn');
playBtn.style.height = '70%';
playBtn.style.width = '30%';
// create a function that will change the elements display property to none

const appElem = document.getElementById('app');
appElem.style.display = 'flex';
appElem.style.justifyContent = 'center';
appElem.style.alignItems = 'center';

/* Clock Timer Element */
const clockElem = document.createElement('div');
// // minutes container
const minutesElem = document.createElement('div');
// function startTimer(timeString) {}
minutesElem.textContent = `${defaultGameStatus.time.split(':')[0]} :`;
const secondsElemn = document.createElement('div');
clockElem.append(minutesElem, secondsElemn);
clockElem.style.display = 'none';

/**
 *
 */
function renderTable() {
  const tbl = document.createElement('table');
  tbl.style.width = '90%';
  tbl.style.height = '90%';

  const tblBody = document.createElement('tbody');
  tblBody.style.width = '100%';
  tblBody.style.height = '100%';
  tblBody.style.backgroundColor = 'white';
  // creating all cells
  for (let i = 0; i < board.length; i++) {
    // creates a table row
    const row = document.createElement('tr');
    row.style.width = '100%';

    row.style.height = `${getPercentage(1 / defaultGameStatus.length)}`;
    row.style.backgroundColor = 'beige';
    row.style.display = 'flex';

    for (let j = 0; j < board[i].length; j++) {
      const cell = document.createElement('td');
      cell.style.display = 'flex';
      cell.style.width = `${getPercentage(1 / defaultGameStatus.length)}`;
      cell.style.justifyContent = 'center';
      cell.style.alignItems = 'center';
      // cell.style.backgroundColor = 'dodgerblue';

      // grab the matching square
      const square = board[i][j];

      if (square.isMine) {
        let mineSvg = document.createElement('svg');
        mineSvg.classList.add('mine-icon');
        let useElem = document.createElement('use');
        useElem.setAttribute('xlinkHref', './images/sprites.svg#icon-bomb');
        mineSvg.appendChild(useElem);
        mineSvg.style.height = '20px';
        mineSvg.style.width = '20px';
        mineSvg.style.fill = 'red';
        cell.append(mineSvg);

        // need to add an event listener to listen for a double click to turn a bomb into a flag
      } else {
        cell.innerText = square.value;
      }

      // console.log('this is the relative square for the cell:', square.isMine);

      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  appElem.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute('border', '2');
}

playBtn.addEventListener('mouseover', (e) => {
  playBtn.style.backgroundColor = 'yellow';
  playBtn.style.color = 'blue';
});

playBtn.addEventListener('mouseleave', (e) => {
  playBtn.style.backgroundColor = 'red';
  playBtn.style.color = 'black';
});

// playBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   playBtn.style.display = 'none';
// });
