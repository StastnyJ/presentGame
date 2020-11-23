import React from "react";
import TextScene from "../Components/TextScene";

export default (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom že se narodil Kuba bla, bla, bla" />,
  <TextScene text="Nějaká hra o Kubovi, musí se vymyslet" />,
  <TextScene text="Fotky s Kubou" />,
];
