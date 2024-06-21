/**
 *
 */
function createFormFragment() {
  const fragment = document.createDocumentFragment();
  const formContainer = fragment.appendChild(document.createElement('div'));
  formContainer.style.width = '90%';
  formContainer.style.height = '100%';
  formContainer.style.display = 'flex';
  formContainer.style.flexDirection = 'column';
  formContainer.style.border = '.5px solid aqua';

  const heading = document.createElement('h3');
  heading.textContent = 'Sign in to track your score';
  heading.className = 'signin-heading';

  const formEl = document.createElement('form');
  formEl.className = 'signin-form';

  const usernameInputWrapper = document.createElement('div');
  usernameInputWrapper.className = 'form-input-wrapper';
  usernameInputWrapper.innerHTML = `<input type="text" name="username" id="name" required /><label for="username">Username</label>`;

  const passwordInputWrapper = document.createElement('div');
  passwordInputWrapper.className = 'form-input-wrapper';
  passwordInputWrapper.innerHTML = `<input type="password" name="password" id="password" required /><label for="password">Password</label>`;

  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.className = 'signin-submit-btn';

  submitBtn.addEventListener('mouseover', (e) => {
    submitBtn.style.backgroundColor = 'aqua';
    submitBtn.style.color = 'black';
  });

  submitBtn.addEventListener('mouseleave', (e) => {
    submitBtn.style.backgroundColor = 'black';
    submitBtn.style.color = 'aqua';
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
  });

  formEl.appendChild(usernameInputWrapper);
  formEl.appendChild(passwordInputWrapper);

  formEl.appendChild(submitBtn);
  formContainer.appendChild(heading);
  formContainer.appendChild(formEl);
  return fragment;
}

/**
 *
 * @param {Number} row
 * @param {Number} col
 * @param {Array or Arrays} board
 * @returns
 */
function revealSquare(row, col, board) {
  // basecase if there is a row or col that is out of bounds or a cell that has isRevealed set to true then do nothing
  if (
    row < 0 ||
    row >= board.length ||
    col < 0 ||
    col >= board.length ||
    board[row][col].isRevealed
  ) {
    return;
  }

  // if we get past the basecase then set the isRevealed property to true
  board[row][col].isRevealed = true;

  // check if the square is a mine and handle end game
  if (board[row][col].isMine) {
    // handle stop clock
    // handle point totalling
    // message user of game end
    alert('Game Over, SAD FACE: You stepped on a mine!');
    // log game score history in list
  } else if (board[row][col].value === 0) {
    // check if the square is next to a mine - meaning it has a value of zero
    // handle revealing any adjacent squares that have a value of zero
    // iterate over the adjacentSquares array
    board[row][col].adjacentValues.forEach((tuple) => {
      if (board[tuple[0]][tuple[1]].value === 0) {
        revealSquare(tuple[0], tuple[1], board);
      }
    });
  }
  renderGameboard();
}

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

/** this should take in the new constructed gameboard and populate the adjacentValues for each cell on the board
 * and then return the updated board
 */
/**
 *
 * @param {Nested Array} board
 * @param {Number} matrix
 * @returns board (array) with adjacentValues added
 */
function getAdjacentPositions(board, matrix) {
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
 * @param {Array} board
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

  initRandomMines(newBoard, matrix, mineCount);

  return getAdjacentPositions(newBoard, matrix);
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

function getPercentage(num) {
  let numStr = num.toString().split('.')[1].slice(0, 3);
  let percentage = numStr.slice(0, 2) + '.' + numStr[numStr.length - 1] + '%';

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

/* Initialize the gameboard */
const board = initBoard(defaultGameboard, defaultGameStatus.mineCount);

console.log('initialized gameboard:', board);

/* Navigation styling */
const navElem = document.getElementsByTagName('nav')[0];
navElem.style.height = '20%';
navElem.style.color = 'whitesmoke';
navElem.style.width = 'var(--page-content-width)';
navElem.style.display = 'flex';
navElem.style.margin = '0 auto';
navElem.style.justifyContent = 'center';
navElem.style.alignItems = 'center';

/* Heading styling */
const headingElem = document.querySelector('nav h2');
headingElem.style.height = '100%';
headingElem.style.marginRight = '30px';
headingElem.style.width = '40%';
headingElem.style.display = 'flex';
headingElem.style.alignItems = 'center';

/* Play button */
const playBtn = document.querySelector('.play-btn');

// create a function that will change the elements display property to none

const loginBtn = document.createElement('input');
loginBtn.setAttribute('type', 'button');
loginBtn.setAttribute('value', 'Sign in');
loginBtn.style.height = '50%';
loginBtn.style.width = '20%';
loginBtn.className = 'login-btn';
loginBtn.addEventListener('click', (e) => {
  let loginForm = createFormFragment();
  appElem.appendChild(loginForm);
});

navElem.appendChild(loginBtn);

/* App styling */
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
function renderGameboard() {
  // refresh the visual gameboard
  appElem.innerHTML = '';
  /* create the visual gameboard */
  const tbl = document.createElement('table');
  // const tbl = document.createElement('div');
  tbl.style.width = '60%';
  tbl.style.height = '60%';

  const tblBody = document.createElement('tbody');
  // const tblBody = document.createElement('div');
  tblBody.style.width = '100%';
  tblBody.style.height = '100%';
  tblBody.style.backgroundColor = 'white';

  // creating all Squares
  for (let i = 0; i < board.length; i++) {
    // creates a row
    const row = document.createElement('tr');
    row.style.width = '100%';
    row.style.height = `${getPercentage(1 / defaultGameStatus.length)}`;
    row.style.display = 'flex';

    for (let j = 0; j < board[i].length; j++) {
      // creating a square per column
      const cell = document.createElement('td');
      cell.className = 'square';
      cell.style.width = `${getPercentage(1 / defaultGameStatus.length)}`;

      cell.addEventListener('click', (e) => {
        e.preventDefault();
        cell.classList.toggle('visible');
        revealSquare(i, j, board);
      });

      // grab the matching square
      const square = board[i][j];

      if (square.isMine) {
        let mineElem = document.createElement('div');
        mineElem.className = 'mine';

        mineElem.addEventListener('dblclick', (e) => {
          // make sure the square has an isRevealed property of false
          // and an isMine property of true
          if (board[i][j].isMine === true && board[i][j].isRevealed === false) {
            let parent = e.target.parentNode;
            parent.classList.toggle('visible');
            e.target.classList.toggle('mine');
            e.target.classList.add('flag');
            board[i][j].isFlagged = true;
            // adjust score for mine flagged
          }
        });

        cell.appendChild(mineElem);

        // need to add an event listener to listen for a double click to turn a bomb into a flag
      } else {
        cell.innerText = square.value;
      }

      if (square.isRevealed) {
        cell.classList.toggle('visible');
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
  playBtn.style.backgroundColor = 'orangered';
  playBtn.style.color = 'black';
  playBtn.style.borderColor = 'orangered';
});

playBtn.addEventListener('mouseleave', (e) => {
  playBtn.style.backgroundColor = 'black';
  playBtn.style.color = 'red';
  playBtn.style.borderColor = 'red';
});

loginBtn.addEventListener('mouseover', (e) => {
  loginBtn.style.backgroundColor = 'aqua';
  loginBtn.style.color = 'black';
});

loginBtn.addEventListener('mouseleave', (e) => {
  loginBtn.style.backgroundColor = 'black';
  loginBtn.style.color = 'aqua';
});
// playBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   playBtn.style.display = 'none';
// });
