import React from "react";
import GameScene from "../Components/GameScene";
import ImageScene from "../Components/ImageScene";
import SongStarter from "../Components/SongStarter";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/School";

const images = ["1.jpg", "0.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const School = (sendMessage: (topic: string, msg: string) => void) => [
  <SongStarter sendMessage={sendMessage} songName="STOP" />,
  <TextScene text="BYL TO VZORNÝ STUDENT" />,
  <TextScene text="Nyní jsi ve škole a máš strašný hlad. Tvým úkolem bude, dostat se ze třídy až do jídelny na objed. Ale pozor, nebude to tak jednoduché. Některé místnosti jsou čerstvě vytřené a kdyby jsi do nich vstoupil, znamenalo by to, že by jsi čelil hněvu naštvané uklízečky, což samozřejmě nechceš. Dále jsou místnosti, ve kterých straší školník, se kterým se také v žádném případě potkat nechceš, těmto místnostem se také musíš vyhýbat. Naštěstí vytřené místnosti vyzařují takové vlhko, že jej ucítíš již v sousedních místnostech (označených modrou barvou) a školník smrdí tak, že jeho zápach jde cítit také ve všech místnostech, které sousedí s místností, kde školník přebývá (označené zeleně). Máš také k dispozici 1 šíp, kterým můžeš školníka zastřelit a místností, kde dříve byl bez problému projít." />,
  <SongStarter songName="school" sendMessage={sendMessage} />,
  <GameScene controllerName="Whumpus" gameName="School" sendMessage={sendMessage} />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];
export default School;
