/// <reference path="./gameView.ts" />

interface position {
  x: number;
  y: number;
}

interface vector extends position {}

class Game {
  private gameOverHandler: () => void;
  private view: GameView;
  private pointer: position;
  private pointerSpeed: vector;
  private targets: { poistion: position; speed: vector; image: string }[];
  private readonly pointerSpeedModifier = 0.6;

  constructor(gameOver: () => void) {
    this.gameOverHandler = gameOver;
    this.pointer = { x: 50, y: 50 };
    this.pointerSpeed = { x: 0, y: 0 };
    this.targets = [
      { image: "ref0", poistion: { x: 20, y: 40 }, speed: { x: 1.5, y: 1 } },
      { image: "ref1", poistion: { x: 60, y: 20 }, speed: { x: -0.4, y: -0.2 } },
      { image: "ref2", poistion: { x: 10, y: 90 }, speed: { x: 2, y: -2.5 } },
      { image: "ref3", poistion: { x: 50, y: 10 }, speed: { x: -1.4, y: 0.98 } },
    ];
    this.view = new GameView(this);
  }

  handleOutOfRange = () => {
    this.targets.forEach((t) => {
      if (t.poistion.x < 0) {
        t.poistion.x = 0;
        t.speed.x *= -1;
      }
      if (t.poistion.y < 0) {
        t.poistion.y = 0;
        t.speed.y *= -1;
      }
      if (t.poistion.x > 92) {
        t.poistion.x = 92;
        t.speed.x *= -1;
      }
      if (t.poistion.y > 92) {
        t.poistion.y = 92;
        t.speed.y *= -1;
      }
    });
  };

  getPointer = () => {
    return { ...this.pointer };
  };

  getTargets = () => {
    return this.targets.map((t) => {
      return { ...t };
    });
  };

  setDirection = (speed: "UP" | "DOWN" | "LEFT" | "RIGHT" | "STOP") => {
    if (speed === "UP") this.pointerSpeed = { x: 0, y: 1 };
    else if (speed === "DOWN") this.pointerSpeed = { x: 0, y: -1 };
    else if (speed === "LEFT") this.pointerSpeed = { x: -1, y: 0 };
    else if (speed === "RIGHT") this.pointerSpeed = { x: 1, y: 0 };
    else this.pointerSpeed = { x: 0, y: 0 };
  };

  refresh = () => {
    this.pointer.x = Math.min(Math.max(this.pointer.x + this.pointerSpeed.x * this.pointerSpeedModifier, 0), 100);
    this.pointer.y = Math.min(Math.max(this.pointer.y + this.pointerSpeed.y * this.pointerSpeedModifier, 0), 100);
    this.targets.forEach((t) => {
      t.poistion.x = t.poistion.x + t.speed.x;
      t.poistion.y = t.poistion.y + t.speed.y;
    });
    this.handleOutOfRange();
    this.view.upadte();
  };

  fire = () => {
    const killed = [];
    this.targets.forEach((t, i) => {
      if (t.poistion.x >= this.pointer.x && t.poistion.x + 8 <= this.pointer.x) {
        if (t.poistion.y >= this.pointer.y && t.poistion.y + 8 <= this.pointer.y) {
          killed.push(i);
        }
      }
    });
    this.targets = this.targets.filter((_, i) => !killed.includes(i));
    killed.forEach((i) => this.view.removeTarget(i));
    if (this.targets.length === 0) this.gameOverHandler();
  };
}
