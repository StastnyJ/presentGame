var GameView = /** @class */ (function () {
    function GameView(game) {
        var _this = this;
        this.clear = function () { return (_this.container.innerHTML = ""); };
        this.drawDesk = function () {
            for (var y = 0; y < _this.game.height; y++) {
                for (var x = 0; x < _this.game.width; x++) {
                    var e = document.createElement(_this.game.getValue(x, y) === 0 ? "div" : "img");
                    e.className = "block " + (_this.game.getValue(x, y) === 0 ? "empty" : "");
                    e.style.left = (100 * x) / _this.game.width + "%";
                    e.style.top = (100 * y) / _this.game.height + "%";
                    e.style.width = 100 / _this.game.width + "%";
                    e.style.height = 100 / _this.game.height + "%";
                    if (_this.game.getValue(x, y) > 0)
                        e.src = "./" + (_this.game.getValue(x, y) - 1) + ".jpg";
                    _this.container.appendChild(e);
                }
            }
        };
        this.draw = function () {
            _this.clear();
            _this.drawDesk();
        };
        this.game = game;
        this.container = document.getElementById("gameContent");
    }
    return GameView;
}());
/// <reference path="./gameView.ts" />
var Game = /** @class */ (function () {
    function Game(width, height, gameOver) {
        var _this = this;
        this.swap = function (a, b) {
            var tmp = _this.board[a.y][a.x];
            _this.board[a.y][a.x] = _this.board[b.y][b.x];
            _this.board[b.y][b.x] = tmp;
        };
        this.getEmptySpace = function () {
            for (var y = 0; y < _this.height; y++) {
                for (var x = 0; x < _this.width; x++) {
                    if (_this.board[y][x] === 0)
                        return { x: x, y: y };
                }
            }
            return { x: -1, y: -1 };
        };
        this.shuffleBoard = function () {
            var moves = ["UP", "DOWN", "LEFT", "RIGHT"];
            for (var i = 0; i < 100000; i++)
                _this.rawMove(moves[Math.floor(4 * Math.random())]);
        };
        this.rawMove = function (dir) {
            var emptySpace = _this.getEmptySpace();
            if (dir === "DOWN") {
                if (emptySpace.y < _this.height - 1)
                    _this.swap(emptySpace, { x: emptySpace.x, y: emptySpace.y + 1 });
            }
            else if (dir === "UP") {
                if (emptySpace.y > 0)
                    _this.swap(emptySpace, { x: emptySpace.x, y: emptySpace.y - 1 });
            }
            else if (dir === "LEFT") {
                if (emptySpace.x > 0)
                    _this.swap(emptySpace, { x: emptySpace.x - 1, y: emptySpace.y });
            }
            else if (dir === "RIGHT") {
                if (emptySpace.x < _this.width - 1)
                    _this.swap(emptySpace, { x: emptySpace.x + 1, y: emptySpace.y });
            }
        };
        this.testWin = function () {
            var ok = true;
            for (var y = 0; y < _this.height && ok; y++) {
                for (var x = 0; x < _this.width && ok; x++) {
                    if (_this.board[y][x] !== x + _this.width * y + 1 && _this.board[y][x] !== 0)
                        ok = false;
                }
            }
            if (ok)
                _this.gameOverHandler();
        };
        this.getValue = function (x, y) {
            return _this.board[y][x];
        };
        this.move = function (dir) {
            _this.rawMove(dir);
            _this.gameView.draw();
            _this.testWin();
        };
        this.gameOverHandler = gameOver;
        this.board = [];
        for (var y = 0; y < height; y++) {
            this.board.push([]);
            for (var x = 0; x < width; x++) {
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
    return Game;
}());
/// <reference path="./game.ts" />
var mqtt;
var reconnectTimeout = 2000;
var host = "stastnyj.duckdns.org";
var port = 9001;
var game = new Game(4, 4, function () {
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
        if (msg.startsWith("move:"))
            game.move(msg.replace("move:", ""));
    };
    mqtt.connect({ onSuccess: onConnect, useSSL: true });
};
mqttConnect();
