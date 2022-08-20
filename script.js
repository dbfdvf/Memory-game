const board = document.querySelector(".board");

class Board {
  constructor() {}
  static words = ["www", "ddd", "ddd", "www"];
  static cards;

  static generateBoard() {
    const wordsShuffle = this.words.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 4; i++) {
      const div = document.createElement("div");
      div.textContent = wordsShuffle[i];
      div.classList.add("card");
      board.appendChild(div);
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

Board.generateBoard();
Board.addMechanicsToCard();
