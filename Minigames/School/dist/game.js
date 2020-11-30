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
        this.drawBoard = function () {
            for (var y = 0; y < _this.game.height; y++) {
                for (var x = 0; x < _this.game.width; x++) {
                    var e = document.createElement("div");
                    e.className = "field" + ((!_this.game.isDiscovered(x, y) && " undiscovered") || "") + ((_this.game.isBreezy(x, y) && " breezy") || "") + ((_this.game.isStinky(x, y) && " stinky") || "") + ((_this.game.isGoal(x, y) && " goal") || "");
                    e.style.left = (100 * x) / _this.game.width + "%";
                    e.style.top = (100 * y) / _this.game.height + "%";
                    e.style.width = 100 / _this.game.width + "%";
                    e.style.height = 100 / _this.game.height + "%";
                    _this.container.appendChild(e);
                }
            }
        };
        // TODO orientation
        this.drawPlayer = function () {
            var e = document.createElement("div");
            e.className = "player";
            e.style.left = (100 * (_this.game.getPlayer().x + 0.2)) / _this.game.width + "%";
            e.style.top = (100 * (_this.game.getPlayer().y + 0.2)) / _this.game.height + "%";
            e.style.width = 60 / _this.game.width + "%";
            e.style.height = 60 / _this.game.height + "%";
            _this.container.appendChild(e);
        };
        this.drawRestartText = function () {
            _this.container.innerHTML = "ZEMŘEL JSI, VYSTŘEL PRO RESTART";
        };
        this.draw = function () {
            _this.clear();
            if (_this.game.isDead())
                _this.drawRestartText();
            else {
                _this.drawBoard();
                _this.drawPlayer();
            }
        };
        this.game = game;
        this.container = document.getElementById("gameContent");
    }
    return GameView;
}());
var map = [
    "#######     #  ",
    "#######        ",
    "####### #    X ",
    "#######        ",
    "####### ###W###",
    "####### #   #  ",
    "    #  # W     ",
    "W   #   #    # ",
    "#   #          ",
    "          #   W",
    "   ##          ",
    "    #        # ",
    "   W   #       ",
    "   ##     #    ",
    " P          #  ",
];
/// <reference path="./gameView.ts" />
/// <reference path="./map.ts" />
var Game = /** @class */ (function () {
    function Game(width, height, gameOver) {
        var _this = this;
        this.loadMap = function () {
            _this.dead = false;
            _this.worldMap = [];
            for (var y = 0; y < _this.height; y++) {
                _this.worldMap.push([]);
                for (var x = 0; x < _this.width; x++) {
                    var act = void 0;
                    if (map[y][x] == "X")
                        act = "GOAL";
                    else if (map[y][x] == "W")
                        act = "WHUMPUS";
                    else if (map[y][x] == "#")
                        act = "PIT";
                    else if (map[y][x] == " ")
                        act = "UNDISCOVERED";
                    else {
                        act = "DISCOVERED";
                        _this.player = { x: x, y: y, orientation: "UP", arrows: 1 };
                    }
                    _this.worldMap[y].push(act);
                }
            }
        };
        this.isStinky = function (x, y) {
            if (_this.isDiscovered(x, y)) {
                if (x > 0 && _this.worldMap[y][x - 1] == "WHUMPUS")
                    return true;
                if (y > 0 && _this.worldMap[y - 1][x] == "WHUMPUS")
                    return true;
                if (x < _this.width - 1 && _this.worldMap[y][x + 1] == "WHUMPUS")
                    return true;
                if (y < _this.height - 1 && _this.worldMap[y + 1][x] == "WHUMPUS")
                    return true;
            }
            return false;
        };
        this.isBreezy = function (x, y) {
            if (_this.isDiscovered(x, y)) {
                if (x > 0 && _this.worldMap[y][x - 1] == "PIT")
                    return true;
                if (y > 0 && _this.worldMap[y - 1][x] == "PIT")
                    return true;
                if (x < _this.width - 1 && _this.worldMap[y][x + 1] == "PIT")
                    return true;
                if (y < _this.height - 1 && _this.worldMap[y + 1][x] == "PIT")
                    return true;
            }
            return false;
        };
        this.isDiscovered = function (x, y) {
            return _this.worldMap[y][x] == "DISCOVERED" || _this.worldMap[y][x] == "GOAL_DISCOVERED";
        };
        this.isGoal = function (x, y) {
            return _this.worldMap[y][x] == "GOAL_DISCOVERED";
        };
        this.isDead = function () { return _this.dead; };
        this.getPlayer = function () {
            return __assign({}, _this.player);
        };
        this.fire = function () {
            if (_this.dead)
                _this.loadMap();
            else {
                if (_this.player.arrows > 0) {
                    _this.player.arrows--;
                    if (_this.player.orientation === "DOWN" &&
                        _this.player.y + 1 < _this.height &&
                        _this.worldMap[_this.player.y + 1][_this.player.x] === "WHUMPUS")
                        _this.worldMap[_this.player.y + 1][_this.player.x] = "UNDISCOVERED";
                    if (_this.player.orientation === "UP" &&
                        _this.player.y > 0 &&
                        _this.worldMap[_this.player.y - 1][_this.player.x] === "WHUMPUS")
                        _this.worldMap[_this.player.y - 1][_this.player.x] = "UNDISCOVERED";
                    if (_this.player.orientation === "RIGHT" &&
                        _this.player.x + 1 < _this.width &&
                        _this.worldMap[_this.player.y][_this.player.x + 1] === "WHUMPUS")
                        _this.worldMap[_this.player.y][_this.player.x + 1] = "UNDISCOVERED";
                    if (_this.player.orientation === "LEFT" &&
                        _this.player.x > 0 &&
                        _this.worldMap[_this.player.y][_this.player.x - 1] === "WHUMPUS")
                        _this.worldMap[_this.player.y][_this.player.x - 1] = "UNDISCOVERED";
                }
            }
        };
        this.move = function (dir) {
            if (_this.player.orientation == dir) {
                if (dir === "DOWN" && _this.player.y + 1 < _this.height)
                    _this.player.y++;
                if (dir === "UP" && _this.player.y > 0)
                    _this.player.y--;
                if (dir === "RIGHT" && _this.player.x + 1 < _this.width)
                    _this.player.x++;
                if (dir === "LEFT" && _this.player.x > 0)
                    _this.player.x--;
                var actFiled = _this.worldMap[_this.player.y][_this.player.x];
                if (actFiled === "WHUMPUS" || actFiled === "PIT")
                    _this.dead = true;
                else {
                    if (actFiled === "GOAL") {
                        _this.worldMap[_this.player.y][_this.player.x] = "GOAL_DISCOVERED";
                        _this.gameOverHandler();
                    }
                    else
                        _this.worldMap[_this.player.y][_this.player.x] = "DISCOVERED";
                }
            }
            else {
                _this.player.orientation = dir;
            }
            _this.gameView.draw();
        };
        this.gameOverHandler = gameOver;
        this.width = width;
        this.height = height;
        this.loadMap();
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
var game = new Game(15, 15, function () {
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
