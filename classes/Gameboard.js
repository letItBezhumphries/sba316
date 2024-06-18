const Square = class Square {
  constructor(squareObj) {
    this.name = 'Square';
    this.col = squareObj.col;
    this.row = squareObj.row;
    this.position = squareObj.position || '';
    this.isMine = squareObj.isMine || false;
    this.value = squareObj.value || 0;
    this.isRevealed = squareObj.isRevealed || false;
    this.isEmpty = squareObj.isEmpty || false;
    this.isFlagged = squareObj.isFlagged || false;
    this.adjacentValues = squareObj.adjacentValues || [];
  }
};

const Game = class Game {
  constructor(length, difficulty, time, scores) {
    this.name = 'Game';
    this.difficulty = difficulty || 'medium';
    this.length = length || 8; // NEED to change this
    this.time = time || '8:00';
    this.scores = scores || [];
    this.board = [];
  }

  getMineCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomIndex(min, max) {
    return Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
    );
  }
};

const GameState = class GameState extends Game {
  constructor(inGame, hasWon, hasLost, mineCount, score) {
    super();
    this.name = 'Gamestate';
    this.mineCount =
      mineCount || this.getMineCount(this.length / 2, this.length);
    this.minesFlagged = 0;
    this.inGame = inGame || true;
    this.hasWon = hasWon || false;
    this.hasLost = hasLost || false;
    this.score = score || 0;
  }

  traverseAdjacentSquares(row, col, board) {
    const adjacentSquares = [];
    // if the square below is in bounds
    if (board[row + 1] && board[row + 1][col]) {
      adjacentSquares.push([row + 1, col]);
    }
    // if the square above is in bounds
    if (board[row - 1] && board[row - 1][col]) {
      adjacentSquares.push([row - 1, col]);
    }
    // if the square to the right is in bounds
    if (board[row][col + 1]) {
      adjacentSquares.push([row, col + 1]);
    }
    // if the square to the left is in bounds
    if (board[row][col - 1]) {
      adjacentSquares.push([row, col - 1]);
    }
    // if the square diagonallrow below and to right is in bounds
    if (board[row + 1] && board[row + 1][col + 1]) {
      adjacentSquares.push([row + 1, col + 1]);
    }
    // if the square diagonallrow below and to the left is in bounds
    if (board[row + 1] && board[row + 1][col - 1]) {
      adjacentSquares.push([row + 1, col - 1]);
    }
    // if the square diagonallrow above and to the right is in bounds
    if (board[row - 1] && board[row - 1][col + 1]) {
      adjacentSquares.push([row - 1, col + 1]);
    }
    // if the square diagonallrow above and to the left is in bounds
    if (board[row - 1] && board[row - 1][col - 1]) {
      adjacentSquares.push([row - 1, col - 1]);
    }
    // return the adjacent squares
    return adjacentSquares;
  }

  setSquareValues(board, length) {
    for (let r = 0; r < length; r++) {
      for (let c = 0; c < length; c++) {
        //if it is not a mine set a starting value and declare variable to store = ?
        // need to gather all adjacent square values for each square on the gameboard
        if (!board[r][c].isMine) {
          let adjustedValueForSquare = 0;
          board[r][c].adjacentSquares = this.traverseAdjacentSquares(
            r,
            c,
            board
          );

          // iterate over the array of adjacentSquares for the current square and check if each adjacent square is a mine
          board[r][c].adjacentSquares.forEach((adjSquare) => {
            if (board[adjSquare[0]][adjSquare[1]].isMine) {
              adjustedValueForSquare++;
            }
          });

          // after its finished checking adjacentSquares for mines and adjusting the current square value,
          // check if the adjustedValueForSquare is equal to zero (meaning no mines adjacent mines) if true set the square isEmpty property to true
          if (adjustedValueForSquare === 0) {
            board[r][c].isEmpty = true;
          }

          // re-assign the value property for the current square to the adjustedValueForSquare
          board[r][c].value = adjustedValueForSquare;
        }
      }
    }
  }

  revealCell(row, col) {
    let currentSquare = this.board[row][col];

    if (
      row > this.length ||
      row < 0 ||
      col < 0 ||
      col > this.length ||
      currentSquare.isRevealed === true
    ) {
      return;
    }

    // reveal the square by setting isRevealed to true
    currentSquare.isRevealed = true;

    // handle if its a mine
    if (currentSquare.isMine === true) {
      alert('Game Over! You stepped on a mine.');
    } else if (currentSquare.value === 0) {
      // otherwise reveal neighboring squares

      this.board[row][col].adjacentSquares.forEach((neighborSquare) => {
        this.revealCell(neighborSquare[0], neighborSquare[1]);
      });
    }
  }

  initGameboard() {
    for (let i = 0; i < this.length; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.length; j++) {
        let newSquare = new Square({
          row: i,
          col: j,
          isMine: false,
          position: `${i}${j}`,
          value: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
          adjacentValues: [],
        });
        this.board[i][j] = newSquare;
      }
    }

    // place mines randomly
    let row;
    let col;
    let currentLoc;
    let minesPlanted = 0;
    while (minesPlanted < this.mineCount) {
      row = this.getRandomIndex(0, this.length - 1);

      col = this.getRandomIndex(0, this.length - 1);

      currentLoc = this.board[row][col];

      // check that the random currentLocation is not already a mine
      if (minesPlanted < this.mineCount && currentLoc.isMine === false) {
        currentLoc.isMine = true;
      }

      minesPlanted++;
    }
    console.log('before setting squareValues the board:', this.board);

    this.setSquareValues(this.board, this.length);
    console.log('after settingSquareValues the board:', this.board);
  }

  renderBoard() {
    const gameboard = document.getElementById('app');
  }
};

const newGame = new GameState();

// Object.setPrototypeOf(Square.prototype, GameState);
newGame.initGameboard();
console.log('new game:', newGame.board);

module.exports = {
  Game,
  GameState,
  Square,
};
