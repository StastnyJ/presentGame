import React from "react";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";

const Outro = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="HappyBirthday" />,
  <ImageScene image="/img/Outro/outroimg.png" />,
];

export default Outro;
