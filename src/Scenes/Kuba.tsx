import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Kuba";

const images = ["1.jpg", "2.jpg", "4.jpg", "3.jpg", "5.jpg", "6.jpg"];

const Kuba = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="STOP" />,
  <TextScene text="Nějaká úvodní řeč o tom že se narodil Kuba bla, bla, bla" />,
  <SongStarter sendMessage={sendMessage} songName="IWillDerive" />,
  <GameScene controllerName="Kuba" gameName="Kuba" sendMessage={sendMessage} />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];
export default Kuba;
