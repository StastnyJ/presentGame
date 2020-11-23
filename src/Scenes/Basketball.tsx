import React from "react";
import TextScene from "../Components/TextScene";
import GameScene from "../Components/GameScene";

export default (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom jak chodil na basket bla, bla, bla" />,
  <GameScene sendMessage={sendMessage} controllerName="Basketball" gameName="Basketball" />,
  <TextScene text="Fotky z basketu" />,
];
