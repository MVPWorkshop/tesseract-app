import React from "react";
import styles from "./separator.atom.module.scss";
import { ISeparatorProps } from "./separator.atom.types";
import { classes } from "../../../shared/utils/styles.util";

const Separator: React.FC<ISeparatorProps> = (props) => {

  const {
    vertical,
    marginAfter,
    marginBefore,
    className,
    invisible
  } = props;

  const margins = {
    marginLeft: (vertical && marginBefore) ? marginBefore : undefined,
    marginRight: (vertical && marginAfter) ? marginAfter : undefined,
    marginTop: (!vertical && marginBefore) ? marginBefore : undefined,
    marginBottom: (!vertical && marginAfter) ? marginAfter : undefined
  };

  return(
    <div
      className={classes(
        styles.separator,
        vertical ? styles.vertical : styles.horizontal,
        [!!invisible, styles.invisible],
        className
      )}
      style={{...margins}}
    />
  );
};

export default  Separator;
