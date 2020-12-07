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
        if (this.game.getValue(x, y) !== "VISIBLE") {
          const e = document.createElement("div");
          e.className = `block${this.game.getValue(x, y) === "SOLID" ? " solid" : ""}`;
          e.style.left = `${x * 5}%`;
          e.style.top = `${y * 4}%`;
          this.container.appendChild(e);
        }
      }
    }
  };

  private drawPlayer = () => {
    const { x, y } = this.game.getPlayer();
    const e = document.createElement("div");
    e.className = "player";
    e.style.left = `${x * 5 + 1}%`;
    e.style.top = `${y * 4 + 0.8}%`;
    this.container.appendChild(e);
  };

  draw = () => {
    this.clear();
    this.drawDesk();
    this.drawPlayer();
  };
}
