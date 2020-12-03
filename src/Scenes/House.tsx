import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/House";

const images = ["1.jpg", "0.jpg", "2.jpg", "3.jpg"];

const House = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="STOP" />,
  <TextScene text="Nějaká úvodní řeč o stavbě baráku bla, bla, bla" />,
  <SongStarter sendMessage={sendMessage} songName="patAMat" />,
  <GameScene sendMessage={sendMessage} controllerName="Tetris" gameName="Tetris" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default House;
