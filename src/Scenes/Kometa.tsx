import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Kometa";

const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

const Kometa = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="STOP" />,
  <TextScene text="KOMEŤÁK TĚLEM I DUŠÍ" />,
  <SongStarter sendMessage={sendMessage} songName="odaNaKometu" />,
  <GameScene sendMessage={sendMessage} controllerName="KillYourReferee" gameName="KillYourReferee" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default Kometa;
