import React from "react";
import TextScene from "../Components/TextScene";

const School = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom jak chodil do školy bla, bla, bla" />,
  <TextScene text="Nějaká hra o škole, musí se vymyslet" />,
  <TextScene text="Fotky ze školy" />,
];
export default School;
