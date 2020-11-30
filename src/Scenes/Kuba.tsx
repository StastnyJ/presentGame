import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Kuba";

const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const Kuba = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom že se narodil Kuba bla, bla, bla" />,
  <GameScene controllerName="Kuba" gameName="Kuba" sendMessage={sendMessage} />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];
export default Kuba;
