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
        this.drawPointer = function () {
            var e = document.createElement("div");
            e.className = "pointer";
            e.style.left = _this.game.getPointer().x + "vw";
            e.style.bottom = _this.game.getPointer().y + "vh";
            _this.container.appendChild(e);
            return e;
        };
        this.drawTarget = function (t) {
            var e = document.createElement("img");
            e.src = "./" + t.image + ".png";
            e.className = "target";
            e.style.left = t.poistion.x + "vw";
            e.style.bottom = t.poistion.y + "vh";
            _this.container.appendChild(e);
            return e;
        };
        this.upadte = function () {
            _this.pointer.style.left = _this.game.getPointer().x + "vw";
            _this.pointer.style.bottom = _this.game.getPointer().y + "vh";
            _this.game.getTargets().forEach(function (t, i) {
                _this.targets[i].style.left = t.poistion.x + "vw";
                _this.targets[i].style.bottom = t.poistion.y + "vh";
            });
        };
        this.removeTarget = function (index) {
            _this.container.removeChild(_this.targets[index]);
            _this.targets = _this.targets.filter(function (_, i) { return i != index; });
        };
        this.game = game;
        this.container = document.getElementById("gameContent");
        this.pointer = this.drawPointer();
        this.targets = game.getTargets().map(function (t) { return _this.drawTarget(t); });
    }
    return GameView;
}());
/// <reference path="./gameView.ts" />
var Game = /** @class */ (function () {
    function Game(gameOver) {
        var _this = this;
        this.pointerSpeedModifier = 0.8;
        this.handleOutOfRange = function () {
            _this.targets.forEach(function (t) {
                if (t.poistion.x < 0) {
                    t.poistion.x = 0;
                    t.speed.x *= -1;
                }
                if (t.poistion.y < 0) {
                    t.poistion.y = 0;
                    t.speed.y *= -1;
                }
                if (t.poistion.x > 92) {
                    t.poistion.x = 92;
                    t.speed.x *= -1;
                }
                if (t.poistion.y > 92) {
                    t.poistion.y = 92;
                    t.speed.y *= -1;
                }
            });
        };
        this.getPointer = function () {
            return __assign({}, _this.pointer);
        };
        this.getTargets = function () {
            return _this.targets.map(function (t) {
                return __assign({}, t);
            });
        };
        this.setDirection = function (speed) {
            if (speed === "UP")
                _this.pointerSpeed = { x: 0, y: 1 };
            else if (speed === "DOWN")
                _this.pointerSpeed = { x: 0, y: -1 };
            else if (speed === "LEFT")
                _this.pointerSpeed = { x: -1, y: 0 };
            else if (speed === "RIGHT")
                _this.pointerSpeed = { x: 1, y: 0 };
            else
                _this.pointerSpeed = { x: 0, y: 0 };
        };
        this.refresh = function () {
            _this.pointer.x = Math.min(Math.max(_this.pointer.x + _this.pointerSpeed.x * _this.pointerSpeedModifier, 0), 100);
            _this.pointer.y = Math.min(Math.max(_this.pointer.y + _this.pointerSpeed.y * _this.pointerSpeedModifier, 0), 100);
            _this.targets.forEach(function (t) {
                t.poistion.x = t.poistion.x + t.speed.x;
                t.poistion.y = t.poistion.y + t.speed.y;
            });
            _this.handleOutOfRange();
            _this.view.upadte();
        };
        this.fire = function () {
            var killed = [];
            _this.targets.forEach(function (t, i) {
                if (t.poistion.x + 8 >= _this.pointer.x && t.poistion.x <= _this.pointer.x) {
                    if (t.poistion.y + 8 >= _this.pointer.y && t.poistion.y <= _this.pointer.y) {
                        killed.push(i);
                    }
                }
            });
            console.log(_this.pointer, _this.targets.map(function (t) { return t.poistion; }), killed);
            _this.targets = _this.targets.filter(function (_, i) { return !killed.includes(i); });
            killed.forEach(function (i) { return _this.view.removeTarget(i); });
            if (_this.targets.length === 0)
                _this.gameOverHandler();
        };
        this.gameOverHandler = gameOver;
        this.pointer = { x: 50, y: 50 };
        this.pointerSpeed = { x: 0, y: 0 };
        this.targets = [
            { image: "ref0", poistion: { x: 20, y: 40 }, speed: { x: 0.8, y: 0.5 } },
            { image: "ref1", poistion: { x: 60, y: 20 }, speed: { x: -0.4, y: -0.2 } },
            { image: "ref2", poistion: { x: 10, y: 90 }, speed: { x: 1, y: -1.2 } },
            { image: "ref3", poistion: { x: 50, y: 10 }, speed: { x: -0.7, y: 0.48 } },
        ];
        this.view = new GameView(this);
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
        if (msg.startsWith("moveStart:"))
            game.setDirection(msg.replace("moveStart:", ""));
        else if (msg === "moveEnd")
            game.setDirection("STOP");
        else if (msg === "FIRE")
            game.fire();
    };
    mqtt.connect({ onSuccess: onConnect, useSSL: true });
};
mqttConnect();
var tick = function () {
    game.refresh();
    setTimeout(tick, 100);
};
tick();
