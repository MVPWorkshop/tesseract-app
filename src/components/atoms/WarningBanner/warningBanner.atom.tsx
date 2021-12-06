import React from "react";
import { IWarningBannerProps } from "./warningBanner.atom.types";
import { classes } from "../../../shared/utils/styles.util";
import styles from "./warningBanner.atom.module.scss";
import Typography from "../Typography/typography.atom";
import { EColor, EFontWeight } from "../../../shared/types/styles.types";
import { ReactComponent as WarningIconSVG } from "../../../shared/assets/warning.svg";

const WarningBanner: React.FC<IWarningBannerProps> = (props) => {

  const {
    className,
    text
  } = props;

  return (
    <div
      className={classes(styles.warningBanner, className)}
    >
      <div>
        <WarningIconSVG className={styles.icon}/>
      </div>
      <Typography
        fontWeight={EFontWeight.BOLD}
        color={EColor.BLACK}
      >
        {text}
      </Typography>
    </div>
  );
};

export default WarningBanner;
