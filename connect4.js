/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */   // each row [y] is and array of cells [x], board[y][x]

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board')
  // TODO: add comment for this code
  // Make Top Row
  const top = document.createElement("tr"); // create table row
  top.setAttribute("id", "column-top"); // set attribute id = "column-top"
  top.addEventListener("click", handleClick); // make it clickable

  for (let x = 0; x < WIDTH; x++) { // as long as x < 7; add  7 table data items (in the "width"/horizontal direction)
    const headCell = document.createElement("td"); // create a table data item/cell
    headCell.setAttribute("id", x); // set id attribute current x increment
    top.append(headCell); // append new cells to top row
  }
  board.append(top); // append 'top' and all its children to board 
  // ***top row, with 7 slots, is now created***

  // TODO: add comment for this code
  // main board:
  for (let y = 0; y < HEIGHT; y++) { // as long as y < 6; add 6 rows 
    const row = document.createElement("tr"); // create new row, tr
    for (let x = 0; x < WIDTH; x++) { // add 7 table data items/cells, just like before
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); // set id attribute to y & x increments (0-0,0-1,0-2...1-0,1-1,1-2, etc.)
      row.append(cell); // append new cells to new row, tr
    }
    board.append(row); // append new row, tr, and its children to board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // given x, we want to check from the bottom-up what y should be (it is empty? => return y; it is filled? => null)
  for (let y = HEIGHT - 1; y >= 0; y--) {
    debugger
    // if empty/nothing there, return y;
    if (!board[y][x]) { // *** '!null' = 'true' 
      return y
    }
  }
  return null;
}



/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div')

  piece.classList.add('piece')
  piece.classList.add(`player${currPlayer}`)
  // piece.style.top = -50 * (y + 2) // ???

  // place piece in y-x cell
  const slot = document.getElementById(`${y}-${x}`)
  slot.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer //  location [y][x] is currPlayer's piece: 1 or 2 on board (no longer 'null')
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {  // if every cell in every row equals itself, game is tied
    return endGame('Tie!')
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    ); // returns an array of arrays
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { // every row...
    for (let x = 0; x < WIDTH; x++) { // ...for every column:
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // a single given row [y], with adjacent [x]values = horizontal win 
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // a single give column [x], with adjacent [y] values = vertical win
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // starting at [y,x], incrementing both y & x values by one = right diagonal win
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // starting at [y,x], decrementing both y & x values by one = left diagonal win

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true; // if any of these are true, player wins the game
      }
    }
  }
}

makeBoard();
makeHtmlBoard();