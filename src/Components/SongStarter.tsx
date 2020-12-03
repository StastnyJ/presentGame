import React, { useEffect } from "react";

interface IProps {
  songName: string;
  sendMessage: (topic: string, msg: string) => void;
}

export default function SongStarter({ sendMessage, songName }: IProps) {
  useEffect(() => {
    sendMessage("presentGameLayout", `RequestSong:${songName}`);
    // eslint-disable-next-line
  }, []);
  return <></>;
}
