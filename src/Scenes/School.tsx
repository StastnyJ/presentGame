import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/School";

const images = ["1.jpg", "0.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const School = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="BYL TO VZORNÝ STUDENT" />,
  <SongStarter songName="school" sendMessage={sendMessage} />,
  <GameScene controllerName="Whumpus" gameName="School" sendMessage={sendMessage} />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];
export default School;
