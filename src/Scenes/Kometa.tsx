import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Kometa";

const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

const Kometa = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o Kometě bla, bla, bla" />,
  <GameScene sendMessage={sendMessage} controllerName="KillYourReferee" gameName="KillYourReferee" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default Kometa;
