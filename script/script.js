"use strict";

let gridItems = document.getElementsByClassName("grid-item");
const boardContainer = document.querySelector(".gameboard");
const btns = document.querySelector(".btns-container");
const playBtn = document.getElementById("playBtn");
let game; /* do not change name */

/* factory function for creating players */

function createPlayer(sign, myTurn) {
  return { sign, myTurn };
}

/*return players  and empty game board */
let gameBoard = (function () {
  let player1, player2, board;

  let setBoard = function () {
    player1 = createPlayer("X", true);
    player2 = createPlayer("O", false);
    board = {
      rows: [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
      ],
      columns: [
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
      ],
      diagonals: [
        ["0", "4", "8"],
        ["2", "4", "6"],
      ],
    };
    return { player1, player2, board };
  };
  return { setBoard };
})();

/* display signs on board cells */
let displayController = (function () {
  let cells = document.querySelectorAll(".grid-item");
  let displayPlayBtn = function () {
    btns.classList.toggle("hidden");
  };
  let displaySigns = function () {
    cells.forEach((cell) => {
      let index = cell.getAttribute("data-index");
      if (
        game.board.rows.flat()[index] === game.player1.sign ||
        game.board.rows.flat()[index] === game.player2.sign
      ) {
        cell.textContent = `${game.board.rows.flat()[index]}`;
      }
    });
  };
  return { displaySigns, displayPlayBtn };
})();

game = gameBoard.setBoard();

/* sets plays moves into board array and check if there is a winner or tie */
let checkResults = (function () {
  let _setRows = function (i, sign) {
    game.board.rows.forEach((row) => {
      if (row.includes(i)) {
        row[row.indexOf(i)] = sign;
      }
    });
  };
  let _setColumns = function (i, sign) {
    game.board.columns.forEach((column) => {
      if (column.includes(i)) {
        column[column.indexOf(i)] = sign;
      }
    });
  };
  let _setDiagonals = function (i, sign) {
    game.board.diagonals.forEach((diagonal) => {
      if (diagonal.includes(i)) {
        diagonal[diagonal.indexOf(i)] = sign;
      }
    });
  };
  let _checkRows = function () {
    game.board.rows.forEach((row) => {
      if (
        row.every((val) => val === game.player1.sign) ||
        row.every((val) => val === game.player2.sign)
      ) {
        boardContainer.removeEventListener("click", gameplay.getMove);
        boardContainer.removeEventListener("click", displayController.displaySigns);
        boardContainer.removeEventListener("click", checkWinner);
        displayController.displayPlayBtn();
      }
    });
  };
  let _checkColumns = function () {
    game.board.columns.forEach((column) => {
      if (
        column.every((val) => val === game.player1.sign) ||
        column.every((val) => val === game.player2.sign)
      ) {
        boardContainer.removeEventListener("click", gameplay.getMove);
        boardContainer.removeEventListener("click", displayController.displaySigns);
        boardContainer.removeEventListener("click", checkWinner);
        displayController.displayPlayBtn();
      }
    });
  };
  let _checkDiagonals = function () {
    game.board.diagonals.forEach((diagonal) => {
      if (
        diagonal.every((val) => val === game.player1.sign) ||
        diagonal.every((val) => val === game.player2.sign)
      ) {
        boardContainer.removeEventListener("click", gameplay.getMove);
        boardContainer.removeEventListener("click", displayController.displaySigns);
        boardContainer.removeEventListener("click", checkWinner);
        displayController.displayPlayBtn();
      }
    });
  };
  let setBoardSigns = function (i, sign) {
    _setRows(i, sign);
    _setColumns(i, sign);
    _setDiagonals(i, sign);
  };
  let checkTie = function () {
    if (
      game.board.rows.flat().every((val) => {
        return val === game.player1.sign || val === game.player2.sign;
      })
    ) {
      displayController.displayPlayBtn();
    }
  };

  let checkWinner = function () {
    _checkRows();
    _checkColumns();
    _checkDiagonals();
  };
  return { setBoardSigns, checkWinner, checkTie };
})();

/* gameplay module, gets players moves, and tracks gameflow */
let gameplay = (function () {
  let getMove = function (e) {
    let index = e.target.getAttribute("data-index");
    if (!game.board.rows.flat().includes(index)) {
      return;
    }
    if (game.player1.myTurn) {
      checkResults.setBoardSigns(index, game.player1.sign);
    }
    if (game.player2.myTurn) {
      checkResults.setBoardSigns(index, game.player2.sign);
    }
    game.player1.myTurn = !game.player1.myTurn;
    game.player2.myTurn = !game.player2.myTurn;
  };
  return { getMove };
})();

let resetGame = (function () {
  let reset = function () {
    displayController.displayPlayBtn();
    gridItems = [...gridItems];
    gridItems.forEach((item) => {
      item.textContent = "";
    });
    game = gameBoard.setBoard();
    boardContainer.addEventListener("click", gameplay.getMove);
    boardContainer.addEventListener("click", displayController.displaySigns);
    boardContainer.addEventListener("click", checkResults.checkWinner);
  };
  return { reset };
})();

boardContainer.addEventListener("click", gameplay.getMove);
boardContainer.addEventListener("click", displayController.displaySigns);
boardContainer.addEventListener("click", checkResults.checkWinner);
boardContainer.addEventListener("click", checkResults.checkTie);
playBtn.addEventListener("click", resetGame.reset);

// let checkTie = function () {
//   game.board.rows.forEach((arr) => {
//     console.log(typeof parseInt(arr[0][0]) !== "number");
//     console.log(arr[0]);

//     arr.every((val) => {
//       console.log(typeof parseInt(val) !== "number");

//       if (typeof parseInt(val) !== "number") {
//         console.log("Its a tie");

//         displayController.displayPlayBtn();
//       }
//     });
//   });
// };

// checkTie();

console.log(parseInt("0"));
