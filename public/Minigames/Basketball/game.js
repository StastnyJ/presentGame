var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var GameView = /** @class */ (function () {
    function GameView(game) {
        var _this = this;
        this.clear = function () { return (_this.container.innerHTML = ""); };
        this.drawBall = function () {
            var e = document.createElement("div");
            e.className = "ball";
            e.style.left = _this.game.getBall().position.x + "vw";
            e.style.bottom = _this.game.getBall().position.y + "vh";
            _this.container.appendChild(e);
        };
        this.drawScore = function () {
            var e = document.createElement("div");
            e.className = "scoreBox";
            e.innerHTML = "SOCRE: " + _this.game.getScore();
            _this.container.appendChild(e);
        };
        this.draw = function () {
            _this.clear();
            _this.drawBall();
            _this.drawScore();
        };
        this.game = game;
        this.container = document.getElementById("gameContent");
    }
    return GameView;
}());
/// <reference path="./gameView.ts" />
var Game = /** @class */ (function () {
    function Game(gameOver) {
        var _this = this;
        this.speedFactor = 14;
        this.gravityFactor = 0.05;
        this.move = function () {
            if (_this.ball.thrown) {
                _this.ball.position.x += _this.ball.speed.x * _this.speedFactor;
                _this.ball.position.y += _this.ball.speed.y * _this.speedFactor;
                _this.ball.speed.y -= _this.gravityFactor;
                if (_this.ball.position.y <= 0)
                    _this.resetBall();
                if (_this.ball.position.y <= 64 && _this.ball.position.y >= 60) {
                    if (_this.ball.position.x >= 85 && _this.ball.position.x <= 95) {
                        _this.score += 1;
                        if (_this.score >= 3)
                            _this.gameOver();
                    }
                }
                _this.gameView.draw();
            }
        };
        this.resetBall = function () {
            _this.ball = { position: { x: 10, y: Math.floor(50 * Math.random()) }, speed: { x: 0, y: 0 }, thrown: false };
        };
        this.getBall = function () {
            return __assign({}, _this.ball);
        };
        this.getScore = function () { return _this.score; };
        this.fire = function (vector) {
            if (_this.ball.thrown)
                return;
            _this.ball.thrown = true;
            _this.ball.speed = vector;
        };
        this.refresh = function () {
            _this.move();
        };
        this.resetBall();
        this.gameOver = gameOver;
        this.score = 0;
        this.gameView = new GameView(this);
        this.gameView.draw();
    }
    return Game;
}());
/// <reference path="./game.ts" />
var mqtt;
var reconnectTimeout = 2000;
var host = "stastnyj.duckdns.org";
var port = 9001;
var game = new Game(function () {
    //@ts-ignore
    var message = new Paho.MQTT.Message("requestController:GameWon");
    message.destinationName = "presentGameController";
    mqtt.send(message);
});
var onConnect = function () {
    mqtt.subscribe("presentGame");
    console.log("connected");
};
var mqttConnect = function () {
    //@ts-ignore
    mqtt = new Paho.MQTT.Client(host, port, "presentGame");
    mqtt.onMessageArrived = function (message) {
        var msg = message.payloadString;
        console.log(msg);
        if (msg.startsWith("FIRE:")) {
            var data = msg.replace("FIRE:", "").split(";");
            game.fire({ x: parseFloat(data[0]), y: parseFloat(data[1]) });
        }
    };
    mqtt.connect({ onSuccess: onConnect, useSSL: true });
};
mqttConnect();
var tick = function () {
    game.refresh();
    setTimeout(tick, 100);
};
tick();
