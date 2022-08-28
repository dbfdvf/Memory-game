const board = document.querySelector(".board");
class Board {
  constructor() {}
  static images4 = [
    "img/paul.jpg",
    "img/paul.jpg",
    "img/leto2.jpg",
    "img/leto2.jpg",
  ];

  static images16 = [
    "img/paul.jpg",
    "img/paul.jpg",
    "img/leto2.jpg",
    "img/leto2.jpg",
    "img/baron.jpg",
    "img/baron.jpg",
    "img/idaho.jpg",
    "img/idaho.jpg",
    "img/Jessica.jpeg",
    "img/Jessica.jpeg",
    "img/leto.jpeg",
    "img/leto.jpeg",
    "img/stilgar.jpg",
    "img/stilgar.jpg",
    "img/thufir.jpeg",
    "img/thufir.jpeg",
  ];

  static images32 = [
    "img/paul.jpg",
    "img/paul.jpg",
    "img/leto2.jpg",
    "img/leto2.jpg",
    "img/baron.jpg",
    "img/baron.jpg",
    "img/idaho.jpg",
    "img/idaho.jpg",
    "img/Jessica.jpeg",
    "img/Jessica.jpeg",
    "img/leto.jpeg",
    "img/leto.jpeg",
    "img/stilgar.jpg",
    "img/stilgar.jpg",
    "img/thufir.jpeg",
    "img/thufir.jpeg",
    "img/Alia.jpg",
    "img/Alia.jpg",
    "img/chani.jpg",
    "img/chani.jpg",
    "img/hwi.jpg",
    "img/hwi.jpg",
    "img/miles.jpg",
    "img/miles.jpg",
    "img/moneo.jpg",
    "img/moneo.jpg",
    "img/odrade.jpg",
    "img/odrade.jpg",
    "img/Shaddam.jpg",
    "img/Shaddam.jpg",
    "img/Gurney.jpg",
    "img/Gurney.jpg",
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
      const imagesShuffle = this.images4.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 4; i++) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = imagesShuffle[i];
        div.classList.add("card");
        board.appendChild(div);
        div.appendChild(img);
      }
      board.className = "";
      board.classList.add("board");
      board.classList.add("boardEasy");
      Board.addMechanicsToCard();
      Board.preview(500);
    }

    if (radioSelected == "medium") {
      const imagesShuffle = this.images16.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 16; i++) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = imagesShuffle[i];
        div.classList.add("card");
        board.appendChild(div);
        div.appendChild(img);
      }
      board.className = "";
      board.classList.add("board");
      board.classList.add("boardMedium");
      Board.addMechanicsToCard();
      Board.preview(1000);
    }

    if (radioSelected == "hard") {
      const imagesShuffle = this.images32.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 32; i++) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = imagesShuffle[i];
        div.classList.add("card");
        board.appendChild(div);
        div.appendChild(img);
      }
      board.className = "";
      board.classList.add("board");
      board.classList.add("boardHard");
      Board.addMechanicsToCard();
      Board.preview(2000);
    }
  }

  static preview(time) {
    const cards = document.querySelectorAll(".card");
    const imgs = document.querySelectorAll("img");

    cards.forEach((card) => {
      card.classList.add("nonClickable");
    });
    imgs.forEach((img) => {
      img.classList.add("opacity");
    });

    function stopPreview() {
      cards.forEach((card) => {
        card.classList.remove("nonClickable");
      });
      imgs.forEach((img) => {
        img.classList.remove("opacity");
      });
    }

    setTimeout(stopPreview, time);
  }

  static addMechanicsToCard() {
    let flag = 0;
    const cards = document.querySelectorAll(".card");
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.addEventListener("click", function () {
        image.classList.add("opacity");
        image.classList.add("match");
        flag++;
      });
    });
    //MOZE NIE POTRZEBNE
    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        card.classList.add("matchCard");
        card.classList.add("nonClickable");
        //flag++;
        if (flag == 2) {
          //this.cards = document.querySelectorAll(".card");
          cards.forEach((card) => {
            card.classList.add("nonClickable");
          });
          GameRules.checkTwoCards();
          function removeClass() {
            //this.cards = document.querySelectorAll(".card");
            cards.forEach(function (card) {
              card.classList.remove("nonClickable");
            });
          }
          setTimeout(removeClass, 1000);
          flag = 0;
        }
      });
    });
  }
}

class GameRules {
  static checkTwoCards() {
    let imagesMatch = document.querySelectorAll(".match");
    let cardsMatch = document.querySelectorAll(".matchCard");
    console.log(cardsMatch);
    function removeClasses(flag) {
      imagesMatch.forEach((img) => {
        img.classList.remove("match");
        //img.classList.remove("cardVisible");
        img.classList.remove("opacity");
      });
      cardsMatch.forEach((card) => {
        card.classList.remove("matchCard");
        if (flag == true) {
          card.classList.remove("match");
          card.classList.add("guessed");
        }
      });
    }
    if (imagesMatch[0].src == imagesMatch[1].src) {
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
