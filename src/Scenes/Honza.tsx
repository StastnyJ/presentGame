import React from "react";
import ImageScene from "../Components/ImageScene";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Honza";

const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const Honza = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom že se narodil Honza bla, bla, bla" />,
  <TextScene text="Nějaká hra o Honzovi, musí se vymyslet" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default Honza;
