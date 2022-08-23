const board = document.querySelector(".board");
class Board {
  constructor() {}
  static words4 = ["www", "www", "ddd", "ddd"];

  static words16 = [
    "www",
    "www",
    "ddd",
    "ddd",
    "aaa",
    "aaa",
    "bbb",
    "bbb",
    "ccc",
    "ccc",
    "vvv",
    "vvv",
    "nnn",
    "nnn",
    "kkk",
    "kkk",
  ];

  static words32 = [
    "www",
    "www",
    "ddd",
    "ddd",
    "aaa",
    "aaa",
    "bbb",
    "bbb",
    "ccc",
    "ccc",
    "vvv",
    "vvv",
    "nnn",
    "nnn",
    "kkk",
    "kkk",
    "qqq",
    "qqq",
    "eee",
    "eee",
    "rrr",
    "rrr",
    "ttt",
    "ttt",
    "yyy",
    "yyy",
    "uuu",
    "uuu",
    "iii",
    "iii",
    "ooo",
    "ooo",
  ];

  static cards;

  static setSettings() {
    const radioSelected = document.querySelector(
      'input[name="difficulty"]:focus'
    ).value;
    Board.generateBoard(radioSelected);
  }

  static generateBoard(radioSelected = "medium") {
    const cardsRemove = document.querySelectorAll(".card");
    cardsRemove.forEach((card) => {
      card.parentNode.removeChild(card);
    });
    console.log(radioSelected);
    if (radioSelected == "easy") {
      const wordsShuffle = this.words4.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 4; i++) {
        const div = document.createElement("div");
        div.textContent = wordsShuffle[i];
        div.classList.add("card");
        board.appendChild(div);
      }
      board.className = "";
      board.classList.add("board");
      board.classList.add("boardEasy");
      Board.addMechanicsToCard();
    }

    if (radioSelected == "medium") {
      const wordsShuffle = this.words16.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 16; i++) {
        const div = document.createElement("div");
        div.textContent = wordsShuffle[i];
        div.classList.add("card");
        board.appendChild(div);
      }
      board.className = "";
      board.classList.add("board");
      board.classList.add("boardMedium");
      Board.addMechanicsToCard();
    }

    if (radioSelected == "hard") {
      const wordsShuffle = this.words32.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 32; i++) {
        const div = document.createElement("div");
        div.textContent = wordsShuffle[i];
        div.classList.add("card");
        div.classList.add("cardHard");
        board.appendChild(div);
      }
      board.className = "";
      board.classList.add("board");
      board.classList.add("boardHard");
      Board.addMechanicsToCard();
    }
  }

  static addMechanicsToCard() {
    let flag = 0;
    this.cards = document.querySelectorAll(".card");
    this.cards.forEach(function (card) {
      card.addEventListener("click", function () {
        card.classList.add("cardVisible");
        card.classList.add("match");
        flag++;
        if (flag == 2) {
          GameRules.checkTwoCards();
          flag = 0;
        }
      });
    });
  }
}

class GameRules {
  static checkTwoCards() {
    let cardsMatch = document.querySelectorAll(".match");
    function removeClasses(flag) {
      cardsMatch.forEach((card) => {
        card.classList.remove("match");
        card.classList.remove("cardVisible");
        if (flag == true) {
          card.classList.add("guessed");
        }
      });
    }
    if (cardsMatch[0].textContent == cardsMatch[1].textContent) {
      setTimeout(removeClasses, 1000, true);
      setTimeout(this.checkWin, 1000);
    } else {
      setTimeout(removeClasses, 1000, false);
    }
  }

  static checkWin() {
    let cardsdArray = document.querySelectorAll(".card");
    cardsdArray = [...cardsdArray];

    let winBoolean = cardsdArray.every(checkGuessed);

    if (winBoolean) {
      alert("win");
    }

    function checkGuessed(card) {
      return card.classList.contains("guessed");
    }
  }
}

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", Board.setSettings);
});

Board.generateBoard();
Board.addMechanicsToCard();
