import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Honza";

const images = ["1.jpg", "0.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

const Honza = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="STOP" />,
  <TextScene text="24.7.2009 HONZA" />,
  <SongStarter sendMessage={sendMessage} songName="Rednex" />,
  <GameScene controllerName="Kuba" gameName="Honza" sendMessage={sendMessage} />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default Honza;
