import React from "react";
import GameScene from "../Components/GameScene";
import TextScene from "../Components/TextScene";

export default (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o svatbě bla, bla, bla" />,
  <GameScene sendMessage={sendMessage} controllerName="Hanoi" gameName="HanoiTowers" />,
  <TextScene text="Fotky ze svatby" />,
];
