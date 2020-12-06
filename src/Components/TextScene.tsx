import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
      fontFamily: "Roboto",
      fontSize: "2.5rem",
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
