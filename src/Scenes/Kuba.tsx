import React from "react";
import GameScene from "../Components/GameScene";
import TextScene from "../Components/TextScene";

export default (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom že se narodil Kuba bla, bla, bla" />,
  <GameScene controllerName="Kuba" gameName="Kuba" sendMessage={sendMessage} />,
  <TextScene text="Fotky s Kubou" />,
];
