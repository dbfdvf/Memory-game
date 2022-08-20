const board = document.querySelector(".board");

class Board {
  constructor() {}
  static words = ["www", "ddd", "ddd", "hhh"];
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
        card.classList.add("cardFlip");
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
    function removeClasses() {
      cardsMatch.forEach((card) => {
        card.classList.remove("match");
        card.classList.remove("cardFlip");
      });
    }
    if (cardsMatch[0].textContent == cardsMatch[1].textContent) {
      console.log("Dobrze");
      setTimeout(removeClasses, 1000);
      cardsMatch.forEach((card) => {
        card.parentElement.removeChild(card);
      });
    } else {
      console.log("źle");
      setTimeout(removeClasses, 1000);
    }
  }
}

Board.generateBoard();
Board.addMechanicsToCard();
