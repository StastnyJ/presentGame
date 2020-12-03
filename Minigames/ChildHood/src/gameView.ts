class GameView {
  private game: Game;
  private container: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.container = document.getElementById("gameContent") as HTMLDivElement;
  }

  private clear = () => (this.container.innerHTML = "");

  drawBoard = () => {
    for (let x = 0; x < this.game.width; x++) {
      for (let y = 0; y < this.game.height; y++) {
        const e = document.createElement("div");
        e.className = this.game.isCovered(x, y) ? "block covered" : this.game.isInPattern(x, y) ? "block pattern" : "block";
        e.style.left = `${Math.floor((100 * x) / this.game.width)}%`;
        e.style.top = `${Math.floor((100 * y) / this.game.height)}%`;
        e.style.width = `${Math.floor(100 / this.game.width)}%`;
        e.style.height = `${Math.floor(100 / this.game.height)}%`;
        this.container.appendChild(e);
      }
    }
  };

  draw = () => {
    this.clear();
    this.drawBoard();
  };
}
