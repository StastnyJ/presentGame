class GameView {
  private game: Game;
  private container: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.container = document.getElementById("gameContent") as HTMLDivElement;
  }

  private clear = () => (this.container.innerHTML = "");

  private drawBoard = () => {
    for (let y = 0; y < this.game.height; y++) {
      for (let x = 0; x < this.game.width; x++) {
        const e = document.createElement("div");
        e.className = `field${(!this.game.isDiscovered(x, y) && " undiscovered") || ""}${
          (this.game.isBreezy(x, y) && " breezy") || ""
        }${(this.game.isStinky(x, y) && " stinky") || ""}${(this.game.isGoal(x, y) && " goal") || ""}`;
        e.style.left = `${(100 * x) / this.game.width}%`;
        e.style.top = `${(100 * y) / this.game.height}%`;
        e.style.width = `${100 / this.game.width}%`;
        e.style.height = `${100 / this.game.height}%`;
        this.container.appendChild(e);
      }
    }
  };

  // TODO orientation
  private drawPlayer = () => {
    const e = document.createElement("img");
    e.className = `player`;
    e.src = `./${this.game.getPlayer().orientation}.png`;
    e.style.left = `${(100 * (this.game.getPlayer().x + 0.2)) / this.game.width}%`;
    e.style.top = `${(100 * (this.game.getPlayer().y + 0.2)) / this.game.height}%`;
    e.style.width = `${60 / this.game.width}%`;
    e.style.height = `${60 / this.game.height}%`;
    this.container.appendChild(e);
  };

  private drawArrowsCount = () => {
    const e = document.createElement("div");
    e.className = "arrows";
    e.id = "arrowsText";
    e.innerHTML = "Zbývá šípů: " + this.game.getPlayer().arrows;
    (document.getElementById("arrowsText") || { remove: () => {} }).remove();
    document.getElementsByTagName("body")[0].appendChild(e);
  };

  private drawRestartText = () => {
    this.container.innerHTML = "ZEMŘEL JSI, VYSTŘEL PRO RESTART";
  };

  draw = () => {
    this.clear();
    if (this.game.isDead()) this.drawRestartText();
    else {
      this.drawBoard();
      this.drawPlayer();
      this.drawArrowsCount();
    }
  };
}
