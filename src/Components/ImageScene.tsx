import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
    },
    image: {
      height: "80vh",
    },
  })
);

interface IProps {
  image: string;
  label?: string;
}

export default function ImageScene({ image, label }: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={image} alt="decoration" />
    </div>
  );
}
