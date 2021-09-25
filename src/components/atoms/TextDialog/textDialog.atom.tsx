import React from "react";
import { ITextDialogProps } from "./textDialog.atom.types";
import { classes } from "../../../shared/utils/styles.util";
import styles from "./textDialog.atom.module.scss";

const TextDialog: React.FC<ITextDialogProps> = (props) => {
  return (
    <div className={classes(styles.textDialog, props.className)}>
      <div className={styles.outter}>
        <div className={styles.inner}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default TextDialog;
