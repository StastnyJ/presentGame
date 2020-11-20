/// <reference path="./gameView.ts" />

interface position {
  x: number;
  y: number;
}

interface ball {
  position: position;
  speed: position;
  thrown: boolean;
}

class Game {
  private ball: ball;
  private gameView: GameView;
  private score: number;
  private gameOver: () => void;

  private readonly speedFactor = 14;
  private readonly gravityFactor = 0.05;

  constructor(gameOver: () => void) {
    this.resetBall();
    this.gameOver = gameOver;
    this.score = 0;
    this.gameView = new GameView(this);
    this.gameView.draw();
  }

  private move = () => {
    if (this.ball.thrown) {
      this.ball.position.x += this.ball.speed.x * this.speedFactor;
      this.ball.position.y += this.ball.speed.y * this.speedFactor;
      this.ball.speed.y -= this.gravityFactor;
      if (this.ball.position.y <= 0) this.resetBall();
      if (this.ball.position.y <= 64 && this.ball.position.y >= 60) {
        if (this.ball.position.x >= 85 && this.ball.position.x <= 95) {
          this.score += 1;
          if (this.score >= 3) this.gameOver();
        }
      }
      this.gameView.draw();
    }
  };

  private resetBall = () => {
    this.ball = { position: { x: 10, y: Math.floor(50 * Math.random()) }, speed: { x: 0, y: 0 }, thrown: false };
  };

  getBall = () => {
    return { ...this.ball };
  };

  getScore = () => this.score;

  fire = (vector: position) => {
    if (this.ball.thrown) return;
    this.ball.thrown = true;
    this.ball.speed = vector;
  };

  refresh = () => {
    this.move();
  };
}
