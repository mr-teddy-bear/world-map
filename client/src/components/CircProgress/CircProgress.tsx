import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./CircProgress.module.css";

type CircProgressPropsType = {
  styles?: React.CSSProperties;
};

export const CircProgress = (props: CircProgressPropsType) => {
  return (
    <div style={props.styles} className={classes.CircProgress}>
      <CircularProgress />
    </div>
  );
};
