import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/House";

const images = ["1.jpg", "0.jpg", "2.jpg", "3.jpg"];

const House = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="STOP" />,
  <TextScene text="PAK VYROSTL DOMEČEK" />,
  <TextScene text="Nyní je potřeba zajistit vlastní místo na bydlení. Tvůj úkol bude postavit dům. Jednoduše vyplň cihlami vžechna místa, která jsou pole obrázku potřeba vyplnit (můžeš dávat cihle i mimo, důležité je jen to, aby jsi vyplnil celý dům)" />,
  <SongStarter sendMessage={sendMessage} songName="patAMat" />,
  <GameScene sendMessage={sendMessage} controllerName="Tetris" gameName="Tetris" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default House;
