import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Wedding";

const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const Wedding = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="19.6.1999 BYLA SVATBA JAKO HROM" />,
  <GameScene sendMessage={sendMessage} controllerName="Hanoi" gameName="HanoiTowers" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default Wedding;
