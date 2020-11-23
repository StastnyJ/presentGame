/// <reference path="./game.ts" />

let mqtt;
const reconnectTimeout = 2000;
const host = "stastnyj.duckdns.org";
const port = 9001;

const game = new Game(() => {
  //@ts-ignore
  const message = new Paho.MQTT.Message("requestController:GameWon");
  message.destinationName = "presentGameController";
  mqtt.send(message);
});

const onConnect = () => {
  mqtt.subscribe("presentGame");
  console.log("connected");
};

const mqttConnect = () => {
  //@ts-ignore
  mqtt = new Paho.MQTT.Client(host, port, "presentGame");
  mqtt.onMessageArrived = function (message) {
    const msg = message.payloadString as string;
    console.log(msg);
    if (msg.startsWith("moveStart:")) game.setDirection(msg.replace("moveStart:", "") as "UP" | "DOWN" | "LEFT" | "RIGHT");
    else if (msg === "moveEnd") game.setDirection("STOP");
    else if (msg === "FIRE") game.fire();
  };
  mqtt.connect({ onSuccess: onConnect, useSSL: true });
};

mqttConnect();

const tick = () => {
  game.refresh();
  setTimeout(tick, 100);
};
tick();
