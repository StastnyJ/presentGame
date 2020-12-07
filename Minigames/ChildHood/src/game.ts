/// <reference path="./gameView.ts" />

interface IPosition {
  x: number;
  y: number;
  speed: number;
}
class Game {
  private gameView: GameView;
  private gameOver: () => void;
  private toiletPosition: IPosition;
  private poops: IPosition[];
  private score: number;
  private nextSpawnProb: number;
  private running: boolean;

  private readonly toiletSpeedModifier = 2;
  private readonly poopSpeedModifier = 1.8;
  private readonly spawnModifier = 0.05;

  constructor(gameOver: () => void) {
    this.gameOver = gameOver;
    this.poops = [];
    this.toiletPosition = { x: 40, y: 92, speed: this.toiletSpeedModifier };
    this.score = 0;
    this.running = true;
    this.nextSpawnProb = 1;
    this.gameView = new GameView(this);
    this.gameView.draw();
  }

  private movePoops = () => {
    this.poops = this.poops.map((p) => {
      return { ...p, y: p.y + p.speed };
    });
  };

  private spawnPoop = () => {
    if (Math.random() < this.nextSpawnProb) {
      this.nextSpawnProb = 0;
      this.poops.push({ x: Math.floor(92 * Math.random()), y: 0, speed: Math.random() * this.poopSpeedModifier });
    } else {
      this.nextSpawnProb += this.spawnModifier;
    }
  };

  private handleCollisions = () => {
    this.handleToiletePoopsCollisions();
    this.handleFloorPoopsCollisions();
  };

  private handleToiletePoopsCollisions = () => {
    for (let i = 0; i < this.poops.length; i++) {
      if (
        this.poops[i].y >= 88 &&
        this.poops[i].x >= this.toiletPosition.x &&
        this.poops[i].x + 8 <= this.toiletPosition.x + 22
      ) {
        this.gameView.hidePoop(i);
        this.poops[i] = { x: -10, y: -10, speed: 0 };
        this.score += 1;
      }
    }
  };

  private handleFloorPoopsCollisions = () => {
    for (let i = 0; i < this.poops.length; i++) {
      if (this.poops[i].y >= 96) {
        this.gameView.hidePoop(i);
        this.poops[i] = { x: -10, y: -10, speed: 0 };
        this.score -= 1;
      }
    }
  };

  getPoops = () => [...this.poops];

  getToilette = () => {
    return { ...this.toiletPosition };
  };

  getScore = () => this.score;

  changeDirection = () => (this.toiletPosition.speed *= -1);

  moveToilette = () => {
    this.toiletPosition.x += this.toiletPosition.speed;
    if (this.toiletPosition.x <= 0) this.toiletPosition.speed = Math.abs(this.toiletPosition.speed);
    if (this.toiletPosition.x >= 78) this.toiletPosition.speed = -Math.abs(this.toiletPosition.speed);
  };

  refresh = () => {
    if (this.running) {
      this.movePoops();
      this.moveToilette();
      this.handleCollisions();
      this.spawnPoop();
      if (this.score >= 32) {
        this.running = false;
        this.gameOver();
      }
      this.gameView.draw();
    }
  };
}
