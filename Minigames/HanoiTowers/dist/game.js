var GameView = /** @class */ (function () {
    function GameView(game) {
        var _this = this;
        this.clear = function () { return (_this.container.innerHTML = ""); };
        this.drawTower = function (_a, offset) {
            var stack = _a.stack, selected = _a.selected;
            stack.reverse().forEach(function (b, i) {
                var width = Math.floor((16 * (b.size + 1)) / _this.game.MAX);
                var e = document.createElement("div");
                e.className = "block " + (b.color === 0 ? "light" : "dark") + "  " + (selected && stack.length - 1 == i ? "selected" : "");
                e.style.left = offset + 10 - Math.floor(width / 2) + "vw";
                e.style.width = width + "vw";
                e.style.bottom = 50 + 8 * i + "vh";
                e.style.zIndex = "" + (100 - i);
                _this.container.appendChild(e);
            });
        };
        this.draw = function () {
            _this.clear();
            _this.drawTower(_this.game.getStack(0), 10);
            _this.drawTower(_this.game.getStack(1), 40);
            _this.drawTower(_this.game.getStack(2), 70);
        };
        this.game = game;
        this.container = document.getElementById("gameContent");
    }
    return GameView;
}());
/// <reference path="./gameView.ts" />
var Game = /** @class */ (function () {
    function Game(initSize, gameOver) {
        var _this = this;
        this.move = function (from, to) {
            var stackFrom = _this.stacks[from];
            var stackTo = _this.stacks[to];
            if (stackFrom.length === 0)
                return;
            if (stackTo.length > 0 && stackFrom[0].size > stackTo[0].size)
                return;
            stackTo.unshift(stackFrom.shift());
            if (_this.testWin())
                _this.gameOverHandler();
        };
        this.testWin = function () {
            return (_this.stacks[0].filter(function (b) { return b.color === 0; }).length === 0 &&
                _this.stacks[1].length === 0 &&
                _this.stacks[2].filter(function (b) { return b.color === 1; }).length === 0);
        };
        this.getStack = function (id) {
            return { stack: _this.stacks[id].slice(), selected: id === _this.selectedStack };
        };
        this.click = function (stackId) {
            if (_this.selectedStack === -1)
                _this.selectedStack = stackId;
            else if (_this.selectedStack === stackId)
                _this.selectedStack = -1;
            else {
                _this.move(_this.selectedStack, stackId);
                _this.selectedStack = -1;
            }
            _this.view.draw();
        };
        this.stacks = [
            new Array(initSize).fill(0).map(function (_, i) {
                return { color: 0, size: i };
            }),
            [],
            new Array(initSize).fill(0).map(function (_, i) {
                return { color: 1, size: i };
            }),
        ];
        this.selectedStack = -1;
        this.gameOverHandler = gameOver;
        this.MAX = initSize;
        this.view = new GameView(this);
        this.view.draw();
    }
    return Game;
}());
/// <reference path="./game.ts" />
var mqtt;
var reconnectTimeout = 2000;
var host = "stastnyj.duckdns.org";
var port = 9001;
var game = new Game(4, function () { });
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
        if (msg.startsWith("click:"))
            game.click(parseInt(msg.replace("click:", "")));
    };
    mqtt.connect({ onSuccess: onConnect, useSSL: true });
};
mqttConnect();
