class GameView {
  private game: Game;
  private container: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.container = document.getElementById("gameContent") as HTMLDivElement;
  }

  private clear = () => (this.container.innerHTML = "");

  private drawBall = () => {
    const e = document.createElement("div");
    e.className = "ball";
    e.style.left = `${this.game.getBall().position.x}vw`;
    e.style.bottom = `${this.game.getBall().position.y}vh`;
    this.container.appendChild(e);
  };

  private drawScore = () => {
    const e = document.createElement("div");
    e.className = "scoreBox";
    e.innerHTML = `SOCRE: ${this.game.getScore()}`;
    this.container.appendChild(e);
  };

  draw = () => {
    this.clear();
    this.drawBall();
    this.drawScore();
  };
}
