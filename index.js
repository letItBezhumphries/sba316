/**
 * This function creates a DOM fragment and appends a signin form to the app
 */
function createFormFragment(gameState) {
  const fragment = document.createDocumentFragment();

  const formContainer = document.createElement('div');
  formContainer.className = 'form-container';
  const heading = document.createElement('h3');
  heading.textContent = 'Sign in to track your score';
  heading.className = 'signin-heading';

  const formEl = document.createElement('form');
  formEl.className = 'signin-form';

  const usernameInputWrapper = document.createElement('div');
  usernameInputWrapper.className = 'form-input-wrapper';
  usernameInputWrapper.innerHTML = `<input type="text" name="username" title="username must be at least 8 character in length" id="usernm" minLength="8" required=true autocomplete=true/><label for="usernm">Username</label>`;

  const passwordInputWrapper = document.createElement('div');
  passwordInputWrapper.className = 'form-input-wrapper';
  passwordInputWrapper.innerHTML = `<input type="password" title="password must have at least 8 characters with at least 1 capitalized character and 1 special character" name="password" id="passwd" pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$" required=true autocomplete=true /><label for="passwd">Password</label>`;

  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.className = 'signin-submit-btn';
  submitBtn.textContent = 'Submit';

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
    // grab the input with id of username
    const usernameInput = document.querySelector('#usernm');
    const passwordInput = document.querySelector('#passwd');
    const loginBtn = document.querySelector('.login-btn');
    const formEl = e.target.parentNode;
    const formContainer = formEl.parentNode;
    const app = formContainer.parentNode;
    const navEl = app.previousElementSibling;
    console.log('navEl:', navEl);

    // as long as the usernameInput.value is 8 chars long
    if (usernameInput.value.length >= 3 && passwordInput.value.length >= 8) {
      gameState.username = usernameInput.value;
      gameState.password = passwordInput.value;

      // create a new button to replace the login-btn
      const seeScoresBtn = document.createElement('button');
      seeScoresBtn.className = 'see-scores-btn';
      seeScoresBtn.innerHTML = `<span>See ${gameState.username}'s scores</span>`;
      navEl.replaceChild(seeScoresBtn, loginBtn);

      // loginBtn.setAttribute('value', `${usernameInput.value} game scores`);
      // remove the fragment from the dom
      app.removeChild(formContainer);
    } else {
      throw Error('You did not supply a valid username or password');
    }
  });

  formEl.appendChild(usernameInputWrapper);
  formEl.appendChild(passwordInputWrapper);

  formEl.appendChild(submitBtn);
  formContainer.appendChild(heading);
  formContainer.appendChild(formEl);
  fragment.appendChild(formContainer);
  return fragment;
}

function formatTime(mins, secs) {
  return `${String(mins).padStart(2, '0')}:${secs.padStart(2, '0')}`;
}

function updateTimer() {
  // store the gameclock element
  const gameClockTimer = document.querySelector('.gameclock-container');
  console.log('gameClockTimer:', gameClockTimer);
  let mins = parseInt(gameClockTimer.firstChild.innerText);
  let secs = parseInt(gameClockTimer.lastChild.innerText);

  console.log('mins:', mins, 'secs:', secs);

  if (mins === 0 && secs === 0) {
    clearInterval(timer);
    alert(
      'Time has run out and the Mines have been detonated! Your Dead! Game Over!'
    );
    // handle scoring
  }

  if (secs > 0) {
    secs--;
  } else {
    secs = 59;
    mins--;
  }

  gameClockTimer.firstChild.textContent = `${mins}`;
  gameClockTimer.lastChild.textContent = `${secs}`;
}

function startGameClock() {
  let timer = setInterval(updateTimer, 1000);
}

/**
 * This function create a document Fragment and returns the fragment so it can be redered to the app element
 * @param {the defaultGameStatus Object} gameState
 * @returns the DOM fragment with a timer that begins counting down
 */
function renderGameClock(gameState) {
  // const fragment = document.createDocumentFragment();

  const gameClockContainer = document.createElement('div');
  gameClockContainer.className = 'gameclock-container';

  let minutesString = gameState.time.split(':')[0];
  let currentSecs = gameState.time.split(':')[1];
  let minutesNum = parseInt(minutesString);

  gameClockContainer.innerHTML = `<div class="mins">${minutesNum}</div><span>:</span><div class=""secs">${currentSecs}</div>`;
  // fragment.appendChild(gameClockContainer);
  appElem.appendChild(gameClockContainer);
  // return fragment;
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
  username: '',
  password: '',
  gameId: 0,
  length: 8,
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
headingElem.innerHTML = `<span>Mines</span><span>weeper</span>`;
headingElem.style.height = '100%';
headingElem.style.marginRight = '30px';
headingElem.style.width = '40%';
headingElem.style.display = 'flex';
headingElem.style.fontSize = '30px';
headingElem.style.letterSpacing = '1.8px';
headingElem.style.alignItems = 'center';
headingElem.style.textDecoration = 'underline';
const headingEnd = headingElem.lastChild;
headingEnd.style.letterSpacing = '8.8px';

/* Play button */
const playBtn = document.createElement('input');
playBtn.className = 'play-btn';
playBtn.setAttribute('type', 'button');
playBtn.setAttribute('value', 'Play');
/* Event listener that renders the game board & renders the game timer  */
playBtn.addEventListener(
  'click',
  (e) => {
    e.stopPropagation();
    // renderGameboard();
    // let gameClock = renderGameClock(defaultGameStatus);
    // appElem.appendChild(gameClock);
    // renderGameClock(defaultGameStatus);
    renderGameboard();
    startGameClock();
  },
  { once: true }
);

/** login button */
const loginBtn = document.createElement('input');
loginBtn.setAttribute('type', 'button');
loginBtn.setAttribute('value', 'Sign in');
loginBtn.style.height = '50%';
loginBtn.style.width = '20%';
loginBtn.className = 'login-btn';
loginBtn.addEventListener(
  'click',
  (e) => {
    let loginForm = createFormFragment(defaultGameStatus);
    appElem.appendChild(loginForm);
  },
  { once: true }
);

/** adding both button to the nav  **/
navElem.appendChild(playBtn);
navElem.appendChild(loginBtn);

/* App styling */
const appElem = document.getElementById('app');
appElem.style.display = 'flex';
appElem.style.justifyContent = 'center';
appElem.style.alignItems = 'center';

const handleSquareClick = (e) => {};

/**
 *
 */
function renderGameboard() {
  // refresh the visual gameboard
  appElem.innerHTML = '';
  renderGameClock(defaultGameStatus);
  // startGameClock();
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

      cell.addEventListener(
        'click',
        (e) => {
          // e.preventDefault();
          // console.log('e', e);
          e.stopPropagation();
          cell.classList.toggle('visible');
          revealSquare(i, j, board);
        },
        { once: true }
      );

      // grab the matching square
      const square = board[i][j];

      if (square.isMine) {
        let mineElem = document.createElement('div');
        mineElem.className = 'mine';

        mineElem.addEventListener(
          'dblclick',
          (e) => {
            // make sure the square has an isRevealed property of false
            // and an isMine property of true
            if (
              board[i][j].isMine === true &&
              board[i][j].isRevealed === false
            ) {
              let parent = e.target.parentNode;
              parent.classList.toggle('visible');
              e.target.classList.toggle('mine');
              e.target.classList.add('flag');
              board[i][j].isFlagged = true;
              // adjust score for mine flagged
            }
          },
          { once: true }
        );

        cell.appendChild(mineElem);
      } else {
        cell.innerText = square.value;
      }

      if (square.isRevealed) {
        cell.classList.toggle('visible');
      }

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
