"use strict";

const gridItems = document.getElementsByClassName("grid-item");
const boardContainer = document.querySelector(".gameboard");
const xoBtns = document.querySelector(".xoBtns-container");
let game;

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

  let displaySigns = function () {
    cells.forEach((cell) => {
      let index = cell.getAttribute("data-index");

      if (game.board.rows.flat()[index] === "X" || game.board.rows.flat()[index] === "O") {
        cell.textContent = `${game.board.rows.flat()[index]}`;
      }
    });
  };
  return { displaySigns };
})();

game = gameBoard.setBoard();

/* gameplay module, gets players moves, and checks if there is a winner */
let gameplay = (function () {
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
      if (row.every((val) => val === "X") || row.every((val) => val === "O")) {
        boardContainer.removeEventListener("click", getMove);
      }
    });
  };
  let _checkColumns = function () {
    game.board.columns.forEach((column) => {
      if (column.every((val) => val === "X") || column.every((val) => val === "O")) {
        boardContainer.removeEventListener("click", getMove);
      }
    });
  };
  let _checkDiagonals = function () {
    game.board.diagonals.forEach((diagonal) => {
      if (diagonal.every((val) => val === "X") || diagonal.every((val) => val === "O")) {
        boardContainer.removeEventListener("click", getMove);
      }
    });
  };

  let checkWinner = function () {
    _checkRows();
    _checkColumns();
    _checkDiagonals();
  };

  let getMove = function (e) {
    let index = e.target.getAttribute("data-index");

    if (!game.board.rows.flat().includes(index)) {
      return;
    }

    if (game.player1.myTurn) {
      _setRows(index, game.player1.sign);
      _setColumns(index, game.player1.sign);
      _setDiagonals(index, game.player1.sign);
    }
    if (game.player2.myTurn) {
      _setRows(index, game.player2.sign);
      _setColumns(index, game.player2.sign);
      _setDiagonals(index, game.player2.sign);
    }

    game.player1.myTurn = !game.player1.myTurn;
    game.player2.myTurn = !game.player2.myTurn;
  };

  return { getMove, checkWinner };
})();

boardContainer.addEventListener("click", gameplay.getMove);
boardContainer.addEventListener("click", displayController.displaySigns);
boardContainer.addEventListener("click", gameplay.checkWinner);
