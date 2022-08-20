const board = document.querySelector(".board");

class Board {
  constructor() {}
  static words = ["www", "ddd", "eee", "hhh"];

  static generateBoard() {
    const wordsShuffle = this.words.sort(() => Math.random() - 0.5);
    console.log(wordsShuffle);
    for (let i = 0; i < 4; i++) {
      const div = document.createElement("div");
      div.textContent = wordsShuffle[i];
      div.classList.add("card");
      board.appendChild(div);
    }
  }
}

Board.generateBoard();
