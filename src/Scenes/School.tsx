import React from "react";
import GameScene from "../Components/GameScene";
import TextScene from "../Components/TextScene";

const School = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom jak chodil do školy bla, bla, bla" />,
  <GameScene controllerName="Whumpus" gameName="School" sendMessage={sendMessage} />,
  <TextScene text="Fotky ze školy" />,
];
export default School;
