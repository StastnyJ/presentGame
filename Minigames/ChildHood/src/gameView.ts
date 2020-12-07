class GameView {
  private game: Game;
  private container: HTMLDivElement;
  private poops: HTMLImageElement[];
  private toilette: HTMLImageElement;
  private scoreBox: HTMLDivElement;

  constructor(game: Game) {
    this.game = game;
    this.poops = [];
    this.container = document.getElementById("gameContent") as HTMLDivElement;
    this.toilette = this.generateToilette();
    this.scoreBox = this.generateScoreBox();
  }

  private generateToilette = () => {
    const e = document.createElement("img");
    e.src = "./toilette.png";
    e.className = "wc";
    this.container.appendChild(e);
    return e;
  };

  private generateScoreBox = () => {
    const e = document.createElement("div");
    e.className = "scoreBox";
    this.container.appendChild(e);
    return e;
  };

  private updatePoops = () => {
    this.game.getPoops().forEach((poop, i) => {
      if (i >= this.poops.length) {
        const e = document.createElement("img");
        e.src = "./poop.png";
        e.className = "poop";
        this.poops.push(e);
        this.container.appendChild(e);
      }
      this.poops[i].style.left = `${poop.x}%`;
      this.poops[i].style.top = `${poop.y}%`;
    });
  };

  private updateToilette = () => {
    this.toilette.style.left = `${this.game.getToilette().x}%`;
    this.toilette.style.top = `${this.game.getToilette().y}%`;
  };

  private updateScore = () => {
    this.scoreBox.innerHTML = this.game.getScore().toString();
  };

  hidePoop = (i: number) => {
    this.poops[i].hidden = true;
  };

  draw = () => {
    this.updatePoops();
    this.updateToilette();
    this.updateScore();
  };
}
