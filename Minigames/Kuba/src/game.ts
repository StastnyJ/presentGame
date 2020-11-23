/// <reference path="./gameView.ts" />

interface position {
  x: number;
  y: number;
}

class Game {
  private gameOverHandler: () => void;
  private board: number[][];
  private gameView: GameView;
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number, gameOver: () => void) {
    this.gameOverHandler = gameOver;
    this.board = [];
    for (let y = 0; y < height; y++) {
      this.board.push([]);
      for (let x = 0; x < width; x++) {
        this.board[y].push(x + width * y + 1);
      }
    }
    this.board[height - 1][width - 1] = 0;
    this.width = width;
    this.height = height;
    this.shuffleBoard();
    this.gameView = new GameView(this);
    this.gameView.draw();
  }

  private swap = (a: position, b: position) => {
    const tmp = this.board[a.y][a.x];
    this.board[a.y][a.x] = this.board[b.y][b.x];
    this.board[b.y][b.x] = tmp;
  };

  private getEmptySpace = () => {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.board[y][x] === 0) return { x: x, y: y } as position;
      }
    }
    return { x: -1, y: -1 } as position;
  };

  private shuffleBoard = () => {
    const moves = ["UP", "DOWN", "LEFT", "RIGHT"] as ("UP" | "DOWN" | "LEFT" | "RIGHT")[];
    for (let i = 0; i < 100000; i++) this.rawMove(moves[Math.floor(4 * Math.random())]);
  };

  private rawMove = (dir: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    const emptySpace = this.getEmptySpace();
    if (dir === "DOWN") {
      if (emptySpace.y < this.height - 1) this.swap(emptySpace, { x: emptySpace.x, y: emptySpace.y + 1 });
    } else if (dir === "UP") {
      if (emptySpace.y > 0) this.swap(emptySpace, { x: emptySpace.x, y: emptySpace.y - 1 });
    } else if (dir === "LEFT") {
      if (emptySpace.x > 0) this.swap(emptySpace, { x: emptySpace.x - 1, y: emptySpace.y });
    } else if (dir === "RIGHT") {
      if (emptySpace.x < this.width - 1) this.swap(emptySpace, { x: emptySpace.x + 1, y: emptySpace.y });
    }
  };

  private testWin = () => {
    let ok = true;
    for (let y = 0; y < this.height && ok; y++) {
      for (let x = 0; x < this.width && ok; x++) {
        if (this.board[y][x] !== x + this.width * y + 1 && this.board[y][x] !== 0) ok = false;
      }
    }
    if (ok) this.gameOverHandler();
  };

  getValue = (x: number, y: number) => {
    return this.board[y][x];
  };

  move = (dir: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    this.rawMove(dir);
    this.gameView.draw();
    this.testWin();
  };
}
