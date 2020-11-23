import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "none",
      height: "100vh",
      width: "100vw",
    },
  })
);

interface IProps {
  gameName: string;
  sendMessage: (topic: string, msg: string) => void;
  controllerName: string;
}

export default function GameScene({ gameName, sendMessage, controllerName }: IProps) {
  const classes = useStyles();

  useEffect(() => {
    sendMessage("presentGameController", `requestController:${controllerName}`);
  }, [sendMessage, controllerName]);

  return <iframe title="game" className={classes.root} src={`/Minigames/${gameName}/game.html`} />;
}
