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
        this.drawDesk = function () {
            for (var y = 0; y < _this.game.height; y++) {
                for (var x = 0; x < _this.game.width; x++) {
                    if (_this.game.getValue(x, y) !== "VISIBLE") {
                        var e = document.createElement("div");
                        e.className = "block" + (_this.game.getValue(x, y) === "SOLID" ? " solid" : "");
                        e.style.left = x * 5 + "%";
                        e.style.top = y * 4 + "%";
                        _this.container.appendChild(e);
                    }
                }
            }
        };
        this.drawPlayer = function () {
            var _a = _this.game.getPlayer(), x = _a.x, y = _a.y;
            var e = document.createElement("div");
            e.className = "player";
            e.style.left = x * 5 + 1 + "%";
            e.style.top = y * 4 + 0.8 + "%";
            _this.container.appendChild(e);
        };
        this.draw = function () {
            _this.clear();
            _this.drawDesk();
            _this.drawPlayer();
        };
        this.game = game;
        this.container = document.getElementById("gameContent");
    }
    return GameView;
}());
var map = [
    "          #         ",
    "                    ",
    "  ###  ##   ## ###  ",
    "  ###  ##   ## ###  ",
    "#      ##   ## ###  ",
    "#              ###  ",
    "## ##           ##  ",
    "## ##            #  ",
    "##               #  ",
    "                    ",
    " ##                #",
    " #########          ",
    " #                  ",
    " # ######   ##      ",
    " # ######   ##      ",
    "                    ",
    " # ### ##   ##      ",
    " # # # ##   ##      ",
    "             #      ",
    "     # ##   ##     #",
    "#    #              ",
    " ### # ##   ##    # ",
    "                # # ",
    " #                  ",
    "          #         ",
];
/// <reference path="./gameView.ts" />
/// <reference path="./map.ts" />
var Game = /** @class */ (function () {
    function Game(gameOver) {
        var _this = this;
        this.width = map[0].length;
        this.height = map.length;
        this.rawMove = function (dir) {
            var speed = dir === "UP" ? { x: 0, y: -1 } : dir === "DOWN" ? { x: 0, y: 1 } : dir === "LEFT" ? { x: -1, y: 0 } : { x: 1, y: 0 };
            while (true) {
                if (_this.playerPosition.x + speed.x < 0)
                    return;
                if (_this.playerPosition.x + speed.x >= _this.width)
                    return;
                if (_this.playerPosition.y + speed.y < 0)
                    return;
                if (_this.playerPosition.y + speed.y >= _this.height)
                    return;
                if (_this.board[_this.playerPosition.y + speed.y][_this.playerPosition.x + speed.x] === "SOLID")
                    return;
                _this.playerPosition.x += speed.x;
                _this.playerPosition.y += speed.y;
                _this.board[_this.playerPosition.y][_this.playerPosition.x] = "VISIBLE";
            }
        };
        this.testWin = function () {
            if (_this.board.filter(function (r) { return r.includes("HIDDEN"); }).length === 0) {
                _this.gameOverHandler();
                _this.board = _this.board.map(function (r) { return r.map(function (_) { return "VISIBLE"; }); });
            }
        };
        this.getValue = function (x, y) { return _this.board[y][x]; };
        this.getPlayer = function () {
            return __assign({}, _this.playerPosition);
        };
        this.move = function (dir) {
            _this.rawMove(dir);
            _this.testWin();
            _this.gameView.draw();
        };
        this.gameOverHandler = gameOver;
        this.board = [];
        for (var y = 0; y < this.height; y++) {
            this.board.push([]);
            for (var x = 0; x < this.width; x++) {
                this.board[y].push(map[y][x] === "#" ? "SOLID" : "HIDDEN");
            }
        }
        this.board[0][0] = "VISIBLE";
        this.playerPosition = { x: 0, y: 0 };
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
        if (msg.startsWith("move:"))
            game.move(msg.replace("move:", ""));
    };
    mqtt.connect({ onSuccess: onConnect, useSSL: true });
};
mqttConnect();
