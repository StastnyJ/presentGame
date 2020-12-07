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
        this.generateToilette = function () {
            var e = document.createElement("img");
            e.src = "./toilette.png";
            e.className = "wc";
            _this.container.appendChild(e);
            return e;
        };
        this.generateScoreBox = function () {
            var e = document.createElement("div");
            e.className = "scoreBox";
            _this.container.appendChild(e);
            return e;
        };
        this.updatePoops = function () {
            _this.game.getPoops().forEach(function (poop, i) {
                if (i >= _this.poops.length) {
                    var e = document.createElement("img");
                    e.src = "./poop.png";
                    e.className = "poop";
                    _this.poops.push(e);
                    _this.container.appendChild(e);
                }
                _this.poops[i].style.left = poop.x + "%";
                _this.poops[i].style.top = poop.y + "%";
            });
        };
        this.updateToilette = function () {
            _this.toilette.style.left = _this.game.getToilette().x + "%";
            _this.toilette.style.top = _this.game.getToilette().y + "%";
        };
        this.updateScore = function () {
            _this.scoreBox.innerHTML = _this.game.getScore().toString();
        };
        this.hidePoop = function (i) {
            _this.poops[i].hidden = true;
        };
        this.draw = function () {
            _this.updatePoops();
            _this.updateToilette();
            _this.updateScore();
        };
        this.game = game;
        this.poops = [];
        this.container = document.getElementById("gameContent");
        this.toilette = this.generateToilette();
        this.scoreBox = this.generateScoreBox();
    }
    return GameView;
}());
/// <reference path="./gameView.ts" />
var Game = /** @class */ (function () {
    function Game(gameOver) {
        var _this = this;
        this.toiletSpeedModifier = 2;
        this.poopSpeedModifier = 1.8;
        this.spawnModifier = 0.05;
        this.movePoops = function () {
            _this.poops = _this.poops.map(function (p) {
                return __assign({}, p, { y: p.y + p.speed });
            });
        };
        this.spawnPoop = function () {
            if (Math.random() < _this.nextSpawnProb) {
                _this.nextSpawnProb = 0;
                _this.poops.push({ x: Math.floor(92 * Math.random()), y: 0, speed: Math.random() * _this.poopSpeedModifier });
            }
            else {
                _this.nextSpawnProb += _this.spawnModifier;
            }
        };
        this.handleCollisions = function () {
            _this.handleToiletePoopsCollisions();
            _this.handleFloorPoopsCollisions();
        };
        this.handleToiletePoopsCollisions = function () {
            for (var i = 0; i < _this.poops.length; i++) {
                if (_this.poops[i].y >= 88 &&
                    _this.poops[i].x >= _this.toiletPosition.x &&
                    _this.poops[i].x + 8 <= _this.toiletPosition.x + 22) {
                    _this.gameView.hidePoop(i);
                    _this.poops[i] = { x: -10, y: -10, speed: 0 };
                    _this.score += 1;
                }
            }
        };
        this.handleFloorPoopsCollisions = function () {
            for (var i = 0; i < _this.poops.length; i++) {
                if (_this.poops[i].y >= 96) {
                    _this.gameView.hidePoop(i);
                    _this.poops[i] = { x: -10, y: -10, speed: 0 };
                    _this.score -= 1;
                }
            }
        };
        this.getPoops = function () { return _this.poops.slice(); };
        this.getToilette = function () {
            return __assign({}, _this.toiletPosition);
        };
        this.getScore = function () { return _this.score; };
        this.changeDirection = function () { return (_this.toiletPosition.speed *= -1); };
        this.moveToilette = function () {
            _this.toiletPosition.x += _this.toiletPosition.speed;
            if (_this.toiletPosition.x <= 0)
                _this.toiletPosition.speed = Math.abs(_this.toiletPosition.speed);
            if (_this.toiletPosition.x >= 78)
                _this.toiletPosition.speed = -Math.abs(_this.toiletPosition.speed);
        };
        this.refresh = function () {
            if (_this.running) {
                _this.movePoops();
                _this.moveToilette();
                _this.handleCollisions();
                _this.spawnPoop();
                if (_this.score >= 32) {
                    _this.running = false;
                    _this.gameOver();
                }
                _this.gameView.draw();
            }
        };
        this.gameOver = gameOver;
        this.poops = [];
        this.toiletPosition = { x: 40, y: 92, speed: this.toiletSpeedModifier };
        this.score = 0;
        this.running = true;
        this.nextSpawnProb = 1;
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
        if (msg === "SWAP")
            game.changeDirection();
    };
    mqtt.connect({ onSuccess: onConnect, useSSL: true });
};
mqttConnect();
var tick = function () {
    game.refresh();
    setTimeout(tick, 100);
};
setTimeout(tick, 100);
