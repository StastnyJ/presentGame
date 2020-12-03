import React from "react";
import TextScene from "../Components/TextScene";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";

const imagesPath = "/img/Basketball";

const images = ["1.jpg", "0.jpg", "2.jpg", "3.jpg", "4.jpg", "7.jpg", "6.jpg", "5.jpg"];

const Basketball = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter songName="STOP" sendMessage={sendMessage} />,
  <TextScene text="Nějaká úvodní řeč o tom jak chodil na basket bla, bla, bla" />,
  <SongStarter songName="Amerika" sendMessage={sendMessage} />,
  <GameScene sendMessage={sendMessage} controllerName="Basketball" gameName="Basketball" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default Basketball;
