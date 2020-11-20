/// <reference path="./game.ts" />

let mqtt;
const reconnectTimeout = 2000;
const host = "stastnyj.duckdns.org";
const port = 9001;

const game = new Game(() => {});

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
    if (msg.startsWith("FIRE:")) {
      const data = msg.replace("FIRE:", "").split(";");
      game.fire({ x: parseFloat(data[0]), y: parseFloat(data[1]) });
    }
  };
  mqtt.connect({ onSuccess: onConnect, useSSL: true });
};

mqttConnect();

const tick = () => {
  game.refresh();
  setTimeout(tick, 100);
};
tick();
