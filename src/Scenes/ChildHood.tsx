import React from "react";
import GameScene from "../Components/GameScene";
import SongStarter from "../Components/SongStarter";
import ImageScene from "../Components/ImageScene";
import TextScene from "../Components/TextScene";

const imagesPath = "/img/ChildHood";

const images = ["2.jpg", "1.jpg", "0.jpg", "3.jpg", "4.jpg", "5.jpg"];

const ChildHood = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="14.12.1970 SE NARODIL KLUČÍK VRATÍK" />,
  <TextScene text="Tvým prvním úkolem v cestě životem bude naučit se správně chodit na nočník/záchod, tedy činnost, která, jak později zjistíš, se stane jednou z nejběžnějších součástí tvého života. Za každé hovno, které zvládneš dostat úspěšně do záchodové mísy dostaneš bod, za každé hovno, které se ti do záchoda dostat nepodaří a skončí tak na podlaze, se ti 1 bod odečte. Aby jsi plně ovládl činnost chození na záchod a stal se mistrem záchodové mísy, musíš nasbírat alespoň 32 bodů." />,
  <SongStarter sendMessage={sendMessage} songName="EnterSandman" />,
  <GameScene controllerName="Swapping" gameName="ChildHood" sendMessage={sendMessage} />,
  ...images.map((img) => <ImageScene image={`${imagesPath}/${img}`} />),
];

export default ChildHood;
