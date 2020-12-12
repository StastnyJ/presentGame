import React, { useEffect, useState } from "react";
import { MqttClient, connect } from "mqtt";
import Basketball from "./Scenes/Basketball";
import ChildHood from "./Scenes/ChildHood";
import Honza from "./Scenes/Honza";
import House from "./Scenes/House";
import Intro from "./Scenes/Intro";
import Kometa from "./Scenes/Kometa";
import Kuba from "./Scenes/Kuba";
import School from "./Scenes/School";
import Wedding from "./Scenes/Wedding";
import "./App.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Outro from "./Scenes/Outro";
import ReactAudioPlayer from "react-audio-player";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    state: {
      position: "absolute",
      bottom: theme.spacing(1),
      right: theme.spacing(1),
      fontFamily: "Roboto",
    },
  })
);

export type appState = "connected" | "connecting" | "connectionLost" | "failed";

const getScenes = (sendMessage: (channel: string, msg: string) => void) => [
  ...Intro,
  ...ChildHood(sendMessage),
  ...School(sendMessage),
  ...Basketball(sendMessage),
  ...Wedding(sendMessage),
  ...Kuba(sendMessage),
  ...House(sendMessage),
  ...Honza(sendMessage),
  ...Kometa(sendMessage),
  ...Outro(sendMessage),
];

export default function App() {
  const classes = useStyles();
  const [mqttClient, setMqttClient] = useState<MqttClient | undefined>(undefined);
  const [song, setSong] = useState<string | undefined>(undefined);
  const [mqttState, setMqttState] = useState<appState>("connecting");
  const [sceneIndex, setSceneIndex] = useState(0);

  const sendMessage = (channel: string, msg: string) => {
    if (mqttClient !== undefined) mqttClient.publish(channel, msg);
  };

  const scenes = getScenes(sendMessage);

  // eslint-disable-next-line
  const messageArrived = (msg: string) => {
    if (msg === "NextScene") setSceneIndex(sceneIndex + 1);
    if (msg === "PrevScene") setSceneIndex(Math.max(sceneIndex - 1, 0));
    if (msg.startsWith("RequestSong:")) {
      if (msg === "RequestSong:STOP") setSong(undefined);
      else setSong(msg.replace("RequestSong:", ""));
      if (sceneIndex + 1 === scenes.length - 1) sendMessage("presentGameController", "requestController:GameOver");
      setSceneIndex(sceneIndex + 1);
    }
  };

  useEffect(() => {
    const client = connect("wss://stastnyj.duckdns.org:9001/mqtt");

    client.on("connect", () => {
      client.subscribe("presentGameLayout");
      setMqttState("connected");
    });

    client.on("disconnect", () => setMqttState("connectionLost"));

    setMqttClient(client);
  }, []);

  useEffect(() => {
    if (mqttClient) {
      if (mqttClient.rawListeners("message").length > 0)
        mqttClient.removeListener("message", mqttClient.rawListeners("message")[0] as any);
      mqttClient.addListener("message", function (topic, message) {
        messageArrived(message.toString());
      });
    }
  }, [mqttClient, messageArrived]);

  return (
    <>
      <div className={classes.state}>{mqttState}</div>
      {scenes[sceneIndex]}
      {song && <ReactAudioPlayer src={`/music/${song}.mp3`} autoPlay loop />}
    </>
  );
}
