import React from "react";
import TextScene from "../Components/TextScene";

const ChildHood = (sendMessage: (topic: string, msg: string) => void) => [
  <TextScene text="Nějaká úvodní řeč o tom že se narodil bla, bla, bla" />,
  <TextScene text="Nějaká hra o dětství, musí se vymyslet" />,
  <TextScene text="Fotky z dětství" />,
];

export default ChildHood;
