class GameView {
  private game: Game;
  private container: HTMLDivElement;
  private pointer: HTMLDivElement;
  private targets: HTMLImageElement[];

  constructor(game: Game) {
    this.game = game;
    this.container = document.getElementById("gameContent") as HTMLDivElement;
    this.pointer = this.drawPointer();
    this.targets = game.getTargets().map((t) => this.drawTarget(t));
  }

  private drawPointer = () => {
    const e = document.createElement("div");
    e.className = "pointer";
    e.style.left = `${this.game.getPointer().x}vw`;
    e.style.bottom = `${this.game.getPointer().y}vh`;
    this.container.appendChild(e);
    return e;
  };

  private drawTarget = (t: { poistion: position; image: string }) => {
    const e = document.createElement("img");
    e.src = `./${t.image}.png`;
    e.className = "target";
    e.style.left = `${t.poistion.x}vw`;
    e.style.bottom = `${t.poistion.y}vh`;
    this.container.appendChild(e);
    return e;
  };

  upadte = () => {
    this.pointer.style.left = `${this.game.getPointer().x}vw`;
    this.pointer.style.bottom = `${this.game.getPointer().y}vh`;
    this.game.getTargets().forEach((t, i) => {
      this.targets[i].style.left = `${t.poistion.x}vw`;
      this.targets[i].style.bottom = `${t.poistion.y}vh`;
    });
  };

  removeTarget = (index: number) => {
    this.container.removeChild(this.targets[index]);
    this.targets = this.targets.filter((_, i) => i != index);
  };
}
