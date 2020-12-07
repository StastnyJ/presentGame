/// <reference path="./gameView.ts" />
/// <reference path="./map.ts" />

interface position {
  x: number;
  y: number;
}

class Game {
  private gameOverHandler: () => void;
  private board: ("SOLID" | "HIDDEN" | "VISIBLE")[][];
  private gameView: GameView;
  private playerPosition: position;

  readonly width = map[0].length;
  readonly height = map.length;

  constructor(gameOver: () => void) {
    this.gameOverHandler = gameOver;
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push([]);
      for (let x = 0; x < this.width; x++) {
        this.board[y].push(map[y][x] === "#" ? "SOLID" : "HIDDEN");
      }
    }
    this.board[0][0] = "VISIBLE";
    this.playerPosition = { x: 0, y: 0 };
    this.gameView = new GameView(this);
    this.gameView.draw();
  }

  private rawMove = (dir: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    const speed: position =
      dir === "UP" ? { x: 0, y: -1 } : dir === "DOWN" ? { x: 0, y: 1 } : dir === "LEFT" ? { x: -1, y: 0 } : { x: 1, y: 0 };
    while (true) {
      if (this.playerPosition.x + speed.x < 0) return;
      if (this.playerPosition.x + speed.x >= this.width) return;
      if (this.playerPosition.y + speed.y < 0) return;
      if (this.playerPosition.y + speed.y >= this.height) return;
      if (this.board[this.playerPosition.y + speed.y][this.playerPosition.x + speed.x] === "SOLID") return;
      this.playerPosition.x += speed.x;
      this.playerPosition.y += speed.y;
      this.board[this.playerPosition.y][this.playerPosition.x] = "VISIBLE";
    }
  };

  private testWin = () => {
    if (this.board.filter((r) => r.includes("HIDDEN")).length === 0) {
      this.gameOverHandler();
      this.board = this.board.map((r) => r.map((_) => "VISIBLE"));
    }
  };

  getValue = (x: number, y: number) => this.board[y][x];

  getPlayer = () => {
    return { ...this.playerPosition };
  };

  move = (dir: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    this.rawMove(dir);
    this.testWin();
    this.gameView.draw();
  };
}
