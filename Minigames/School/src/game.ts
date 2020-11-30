/// <reference path="./gameView.ts" />
/// <reference path="./map.ts" />

interface player {
  x: number;
  y: number;
  orientation: direction;
  arrows: number;
}

type direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type mapState = "UNDISCOVERED" | "DISCOVERED" | "WHUMPUS" | "GOAL" | "PIT" | "GOAL_DISCOVERED";

class Game {
  private gameOverHandler: () => void;
  private gameView: GameView;
  readonly width: number;
  readonly height: number;
  private worldMap: mapState[][];
  private player: player;
  private dead: boolean;

  constructor(width: number, height: number, gameOver: () => void) {
    this.gameOverHandler = gameOver;
    this.width = width;
    this.height = height;
    this.loadMap();
    this.gameView = new GameView(this);
    this.gameView.draw();
  }

  private loadMap = () => {
    this.dead = false;
    this.worldMap = [];
    for (let y = 0; y < this.height; y++) {
      this.worldMap.push([]);
      for (let x = 0; x < this.width; x++) {
        let act: mapState;
        if (map[y][x] == "X") act = "GOAL";
        else if (map[y][x] == "W") act = "WHUMPUS";
        else if (map[y][x] == "#") act = "PIT";
        else if (map[y][x] == " ") act = "UNDISCOVERED";
        else {
          act = "DISCOVERED";
          this.player = { x: x, y: y, orientation: "UP", arrows: 1 };
        }
        this.worldMap[y].push(act);
      }
    }
  };

  isStinky = (x: number, y: number) => {
    if (this.isDiscovered(x, y)) {
      if (x > 0 && this.worldMap[y][x - 1] == "WHUMPUS") return true;
      if (y > 0 && this.worldMap[y - 1][x] == "WHUMPUS") return true;
      if (x < this.width - 1 && this.worldMap[y][x + 1] == "WHUMPUS") return true;
      if (y < this.height - 1 && this.worldMap[y + 1][x] == "WHUMPUS") return true;
    }
    return false;
  };

  isBreezy = (x: number, y: number) => {
    if (this.isDiscovered(x, y)) {
      if (x > 0 && this.worldMap[y][x - 1] == "PIT") return true;
      if (y > 0 && this.worldMap[y - 1][x] == "PIT") return true;
      if (x < this.width - 1 && this.worldMap[y][x + 1] == "PIT") return true;
      if (y < this.height - 1 && this.worldMap[y + 1][x] == "PIT") return true;
    }
    return false;
  };

  isDiscovered = (x: number, y: number) => {
    return this.worldMap[y][x] == "DISCOVERED" || this.worldMap[y][x] == "GOAL_DISCOVERED";
  };

  isGoal = (x: number, y: number) => {
    return this.worldMap[y][x] == "GOAL_DISCOVERED";
  };

  isDead = () => this.dead;

  getPlayer = () => {
    return { ...this.player };
  };

  fire = () => {
    if (this.dead) this.loadMap();
    else {
      if (this.player.arrows > 0) {
        this.player.arrows--;
        if (
          this.player.orientation === "DOWN" &&
          this.player.y + 1 < this.height &&
          this.worldMap[this.player.y + 1][this.player.x] === "WHUMPUS"
        )
          this.worldMap[this.player.y + 1][this.player.x] = "UNDISCOVERED";

        if (
          this.player.orientation === "UP" &&
          this.player.y > 0 &&
          this.worldMap[this.player.y - 1][this.player.x] === "WHUMPUS"
        )
          this.worldMap[this.player.y - 1][this.player.x] = "UNDISCOVERED";

        if (
          this.player.orientation === "RIGHT" &&
          this.player.x + 1 < this.width &&
          this.worldMap[this.player.y][this.player.x + 1] === "WHUMPUS"
        )
          this.worldMap[this.player.y][this.player.x + 1] = "UNDISCOVERED";

        if (
          this.player.orientation === "LEFT" &&
          this.player.x > 0 &&
          this.worldMap[this.player.y][this.player.x - 1] === "WHUMPUS"
        )
          this.worldMap[this.player.y][this.player.x - 1] = "UNDISCOVERED";
      }
    }
    this.gameView.draw();
  };

  move = (dir: direction) => {
    if (this.player.orientation == dir) {
      if (dir === "DOWN" && this.player.y + 1 < this.height) this.player.y++;
      if (dir === "UP" && this.player.y > 0) this.player.y--;
      if (dir === "RIGHT" && this.player.x + 1 < this.width) this.player.x++;
      if (dir === "LEFT" && this.player.x > 0) this.player.x--;
      const actFiled = this.worldMap[this.player.y][this.player.x];
      if (actFiled === "WHUMPUS" || actFiled === "PIT") this.dead = true;
      else {
        if (actFiled === "GOAL") {
          this.worldMap[this.player.y][this.player.x] = "GOAL_DISCOVERED";
          this.gameOverHandler();
        } else this.worldMap[this.player.y][this.player.x] = "DISCOVERED";
      }
    } else {
      this.player.orientation = dir;
    }
    this.gameView.draw();
  };
}
