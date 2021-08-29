import React from "react";
import styles from "./separator.atom.module.scss";
import { ISeparatorProps } from "./separator.atom.types";
import { classes } from "../../../shared/utils/styles.util";

const Separator: React.FC<ISeparatorProps> = (props) => {

  const {
    vertical,
    className
  } = props;

  return(
    <div
      className={classes(
        styles.separator,
        vertical ? styles.vertical : styles.horizontal,
        className
      )}
    />
  );
};

export default  Separator;
