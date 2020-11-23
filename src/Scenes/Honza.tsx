import React from "react";
import TextScene from "../Components/TextScene";

export default (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom že se narodil Honza bla, bla, bla" />,
  <TextScene text="Nějaká hra o Honzovi, musí se vymyslet" />,
  <TextScene text="Fotky s Honzou" />,
];