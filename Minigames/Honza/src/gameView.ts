class GameView {
  private game: Game;
  private container: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.container = document.getElementById("gameContent") as HTMLDivElement;
  }

  private clear = () => (this.container.innerHTML = "");

  private drawDesk = () => {
    for (let y = 0; y < this.game.height; y++) {
      for (let x = 0; x < this.game.width; x++) {
        const e = document.createElement(this.game.getValue(x, y) === 0 ? "div" : "img");
        e.className = `block ${this.game.getValue(x, y) === 0 ? "empty" : ""}`;
        e.style.left = `${(100 * x) / this.game.width}%`;
        e.style.top = `${(100 * y) / this.game.height}%`;
        e.style.width = `${100 / this.game.width}%`;
        e.style.height = `${100 / this.game.height}%`;
        if (this.game.getValue(x, y) > 0) (e as HTMLImageElement).src = `./${this.game.getValue(x, y) - 1}.jpg`;
        this.container.appendChild(e);
      }
    }
  };

  draw = () => {
    this.clear();
    this.drawDesk();
  };
}
