import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      fontFamily: "Roboto",
      fontSize: "1.8rem",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

interface IProps {
  text: string;
}

export default function TextScene({ text }: IProps) {
  const classes = useStyles();

  return <div className={classes.root}>{text}</div>;
}
