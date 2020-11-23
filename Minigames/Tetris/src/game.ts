/// <reference path="./gameView.ts" />
/// <reference path="./tiles.ts" />
/// <reference path="./patterns.ts" />

interface position {
  x: number;
  y: number;
}

class Game {
  private gameView: GameView;
  public readonly width: number;
  public readonly height: number;
  private gameOver: () => void;
  private fixed: boolean[][];
  private tilePosition: position;
  private pattern: string[];
  private runnign: boolean;
  private tile: Tile;

  constructor(width: number, height: number, gameOver: () => void) {
    this.gameOver = gameOver;
    this.width = width;
    this.height = height;
    this.pattern = patterns[0];
    this.runnign = true;
    this.fixed = Array(height)
      .fill(0)
      .map((_) => Array(width).fill(false));
    this.gameView = new GameView(this);
    this.regenerateTile();
    this.gameView.draw();
  }

  private regenerateTile = () => {
    this.tilePosition = { x: Math.floor(this.width / 2), y: 0 };
    this.tile = new Tile();
  };

  private makeFixIfTouch = () => {
    let touch = this.tilePosition.y + this.tile.getHeight() > this.height;
    for (let x = 0; x < this.tile.getWidth() && !touch; x++) {
      for (let y = 0; y < this.tile.getHeight() && !touch; y++) {
        if (this.fixed[y + this.tilePosition.y][x + this.tilePosition.x] && this.tile.isCovered(x, y)) touch = true;
      }
    }
    if (touch) {
      this.tilePosition.y--;
      for (let x = 0; x < this.tile.getWidth(); x++) {
        for (let y = 0; y < this.tile.getHeight(); y++) {
          if (this.tile.isCovered(x, y)) this.fixed[y + this.tilePosition.y][x + this.tilePosition.x] = true;
        }
      }
      this.breakFullRows();
      this.regenerateTile();
      this.testPatternFilled();
    }
    return touch;
  };

  private breakFullRows = () => {
    this.fixed = this.fixed.filter((r) => !r.reduce((a, acc) => acc && a, true));
    for (let i = 0, toDo = this.height - this.fixed.length; i < toDo; i++)
      this.fixed.unshift(new Array(this.width).fill(false));
  };

  private testPatternFilled = () => {
    let covered = true;
    for (let x = 0; x < this.width && covered; x++) {
      for (let y = 0; y < this.height && covered; y++) {
        if (this.isInPattern(x, y) && !this.isCovered(x, y)) covered = false;
      }
    }
    if (covered) this.endGame();
  };

  private endGame = () => {
    this.runnign = false;
    this.tile = undefined;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.fixed[y][x] = this.isInPattern(x, y);
      }
    }
    this.gameView.draw();
    this.gameOver();
  };

  isInPattern = (x: number, y: number) => {
    return this.pattern[y][x] === "#";
  };

  isCovered = (x: number, y: number) => {
    return this.fixed[y][x] || (this.tile && this.tile.isCovered(x - this.tilePosition.x, y - this.tilePosition.y));
  };

  move = (direction: "LEFT" | "RIGHT" | "DOWN" | "ROTATE") => {
    if (this.runnign) {
      if (direction === "LEFT") {
        if (this.tilePosition.x > 0) this.tilePosition.x--;
      } else if (direction === "RIGHT") {
        if (this.tilePosition.x + this.tile.getWidth() < this.width) this.tilePosition.x++;
      } else if (direction === "DOWN") {
        while (!this.makeFixIfTouch()) this.tilePosition.y++;
      } else {
        this.tile.rotate(this.width - this.tilePosition.x);
        this.makeFixIfTouch();
      }
      this.gameView.draw();
    }
  };

  refresh = () => {
    if (this.runnign) {
      this.tilePosition.y++;
      this.makeFixIfTouch();
      this.gameView.draw();
    }
  };
}
