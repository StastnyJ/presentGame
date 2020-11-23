import React from "react";
import GameScene from "../Components/GameScene";
import TextScene from "../Components/TextScene";

export default (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o Kometě bla, bla, bla" />,
  <GameScene sendMessage={sendMessage} controllerName="KillYourReferee" gameName="KillYourReferee" />,
  <TextScene text="Fotky z Komety" />,
];
