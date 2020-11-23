var GameView = /** @class */ (function () {
    function GameView(game) {
        var _this = this;
        this.clear = function () { return (_this.container.innerHTML = ""); };
        this.drawBoard = function () {
            for (var x = 0; x < _this.game.width; x++) {
                for (var y = 0; y < _this.game.height; y++) {
                    var e = document.createElement("div");
                    e.className = _this.game.isCovered(x, y) ? "block covered" : "block";
                    e.style.left = Math.floor((100 * x) / _this.game.width) + "%";
                    e.style.top = Math.floor((100 * y) / _this.game.height) + "%";
                    e.style.width = Math.floor(100 / _this.game.width) + "%";
                    e.style.height = Math.floor(100 / _this.game.height) + "%";
                    _this.container.appendChild(e);
                }
            }
        };
        this.draw = function () {
            _this.clear();
            _this.drawBoard();
        };
        this.game = game;
        this.container = document.getElementById("gameContent");
    }
    return GameView;
}());
var Tile = /** @class */ (function () {
    function Tile() {
        var _this = this;
        this.getShape = function () { return _this.shapes[_this.actSahpe]; };
        this.getWidth = function () { return _this.shapes[_this.actSahpe][0].length; };
        this.getHeight = function () { return _this.shapes[_this.actSahpe].length; };
        this.isCovered = function (x, y) {
            if (x < 0 || y < 0)
                return false;
            if (y >= _this.getHeight() || x >= _this.getWidth())
                return false;
            return _this.getShape()[y][x];
        };
        this.rotate = function (availableSpace) {
            var newIndex = (_this.actSahpe + 1) % _this.shapes.length;
            if (availableSpace >= _this.shapes[_this.actSahpe][0].length)
                _this.actSahpe = newIndex;
        };
        this.shapes = tileShapes[Math.floor(Math.random() * tileShapes.length)];
        this.actSahpe = 0;
    }
    return Tile;
}());
var tileShapes = [
    // TILE 0
    [
        [
            // ##
            //  ##
            [true, true, false],
            [false, true, true],
        ],
        [
            //  #
            // ##
            // #
            [false, true],
            [true, true],
            [true, false],
        ],
    ],
    // TILE 1
    [
        [
            //  ##
            // ##
            [false, true, true],
            [true, true, false],
        ],
        [
            // #
            // ##
            //  #
            [true, false],
            [true, true],
            [false, true],
        ],
    ],
    // TILE 2
    [
        [
            // ##
            // ##
            [true, true],
            [true, true],
        ],
    ],
    // TILE 3
    [
        [
            // #
            // #
            // ##
            [true, false],
            [true, false],
            [true, true],
        ],
        [
            //   #
            // ###
            [false, false, true],
            [true, true, true],
        ],
        [
            // ##
            //  #
            //  #
            [true, true],
            [false, true],
            [false, true],
        ],
        [
            // ###
            // #
            [true, true, true],
            [true, false, false],
        ],
    ],
    // TILE 4
    [
        [
            //  #
            //  #
            // ##
            [false, true],
            [false, true],
            [true, true],
        ],
        [
            // #
            // ###
            [true, false, false],
            [true, true, true],
        ],
        [
            // ##
            // #
            // #
            [true, true],
            [true, false],
            [true, false],
        ],
        [
            // ###
            //   #
            [true, true, true],
            [false, false, true],
        ],
    ],
    // TILE 5
    [
        [
            //  #
            // ##
            //  #
            [false, true],
            [true, true],
            [false, true],
        ],
        [
            //  #
            // ###
            [false, true, false],
            [true, true, true],
        ],
        [
            // #
            // ##
            // #
            [true, false],
            [true, true],
            [true, false],
        ],
        [
            // ###
            //  #
            [true, true, true],
            [false, true, false],
        ],
    ],
    // TILE 6
    [
        [
            //  ####
            [true, true, true, true],
        ],
        [
            // #
            // #
            // #
            // #
            [true],
            [true],
            [true],
            [true],
        ],
    ],
];
/// <reference path="./gameView.ts" />
/// <reference path="./tiles.ts" />
var Game = /** @class */ (function () {
    function Game(width, height, gameOver) {
        var _this = this;
        this.regenerateTile = function () {
            _this.tilePosition = { x: Math.floor(_this.width / 2), y: 0 };
            _this.tile = new Tile();
        };
        this.makeFixIfTouch = function () {
            var touch = _this.tilePosition.y + _this.tile.getHeight() > _this.height;
            for (var x = 0; x < _this.tile.getWidth() && !touch; x++) {
                for (var y = 0; y < _this.tile.getHeight() && !touch; y++) {
                    if (_this.fixed[y + _this.tilePosition.y][x + _this.tilePosition.x] && _this.tile.isCovered(x, y))
                        touch = true;
                }
            }
            if (touch) {
                _this.tilePosition.y--;
                for (var x = 0; x < _this.tile.getWidth(); x++) {
                    for (var y = 0; y < _this.tile.getHeight(); y++) {
                        if (_this.tile.isCovered(x, y))
                            _this.fixed[y + _this.tilePosition.y][x + _this.tilePosition.x] = true;
                    }
                }
                _this.breakFullRows();
                _this.regenerateTile();
            }
            return touch;
        };
        this.breakFullRows = function () {
            _this.fixed = _this.fixed.filter(function (r) { return !r.reduce(function (a, acc) { return acc && a; }, true); });
            for (var i = 0, toDo = _this.height - _this.fixed.length; i < toDo; i++)
                _this.fixed.unshift(new Array(_this.width).fill(false));
        };
        this.isCovered = function (x, y) {
            return _this.fixed[y][x] || _this.tile.isCovered(x - _this.tilePosition.x, y - _this.tilePosition.y);
        };
        this.move = function (direction) {
            if (direction === "LEFT") {
                if (_this.tilePosition.x > 0)
                    _this.tilePosition.x--;
            }
            else if (direction === "RIGHT") {
                if (_this.tilePosition.x + _this.tile.getWidth() < _this.width)
                    _this.tilePosition.x++;
            }
            else if (direction === "DOWN") {
                while (!_this.makeFixIfTouch())
                    _this.tilePosition.y++;
            }
            else {
                _this.tile.rotate(_this.width - _this.tilePosition.x);
                _this.makeFixIfTouch();
            }
            _this.gameView.draw();
        };
        this.refresh = function () {
            _this.tilePosition.y++;
            _this.makeFixIfTouch();
            _this.gameView.draw();
        };
        this.gameOver = gameOver;
        this.width = width;
        this.height = height;
        this.fixed = Array(height)
            .fill(0)
            .map(function (_) { return Array(width).fill(false); });
        this.gameView = new GameView(this);
        this.regenerateTile();
        this.gameView.draw();
    }
    return Game;
}());
/// <reference path="./game.ts" />
var mqtt;
var reconnectTimeout = 2000;
var host = "stastnyj.duckdns.org";
var port = 9001;
var game = new Game(10, 20, function () {
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
var tick = function () {
    game.refresh();
    setTimeout(tick, 1000);
};
setTimeout(tick, 1000);
