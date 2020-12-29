import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/Wedding";

const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const Wedding = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="STOP" />,
  <TextScene text="19.6.1999 BYLA SVATBA JAKO HROM" />,
  <TextScene text="Momentálně jsi splnil všechny přepoklady a můžeš se oženit! Ovšem organizátoři přivezli svatební dorty do špatných místností a tak je na tobě, aby jsi dorty přestěhoval a svatbu tak zachránil. Bohužel patra dortů jsou příliš těžká a tak musíš dorty stěhovat patro po patře. Jelikož dorty nejsou úplně stabilní, můžeš patro dortu položit vždy jen na stůl nebo na patro, které je alespoň tak velké, jako patro, které právě stěhuješ. Tvůj úkol je oba svatební dorty prohodit, tedy dostat čokoládový dort úplně doleva a jahodový úplně doprava." />,
  <SongStarter sendMessage={sendMessage} songName="HledaSeZena" />,
  <GameScene sendMessage={sendMessage} controllerName="Hanoi" gameName="HanoiTowers" />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default Wedding;
