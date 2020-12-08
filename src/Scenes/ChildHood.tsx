import React from "react";
import GameScene from "../Components/GameScene";
import SongStarter from "../Components/SongStarter";
import ImageScene from "../Components/ImageScene";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/ChildHood";

const images = ["2.png", "1.png", "0.png", "3.png", "4.png"];

const ChildHood = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="14.12.1970 SE NARODIL KLUČÍK VRATÍK" />,
  <SongStarter sendMessage={sendMessage} songName="EnterSandman" />,
  <GameScene controllerName="Swapping" gameName="ChildHood" sendMessage={sendMessage} />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default ChildHood;
