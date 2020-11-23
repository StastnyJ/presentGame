import React from "react";
import GameScene from "../Components/GameScene";
import TextScene from "../Components/TextScene";

export default (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o stavbě baráku bla, bla, bla" />,
  <GameScene sendMessage={sendMessage} controllerName="Tetris" gameName="Tetris" />,
  <TextScene text="Fotky o baráku" />,
];