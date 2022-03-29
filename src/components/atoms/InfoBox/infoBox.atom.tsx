import React from "react";
import {EColor, EFontWeight} from "../../../shared/types/styles.types";
import Skeleton from "../Skeleton/skeleton.atom";
import Typography from "../Typography/typography.atom";
import { IInfoBox } from "./infoBox.atom.types";
import styles from "./infoBox.atom.module.scss";

const InfoBox: React.FC<IInfoBox> = (props) => {

  const {header, value, footer, loading = false, showHeader = false} = props;
  // temp - find a better way to handle this
  const showUsdValue = header && header !== "$0"; 

  return (
    <div className={styles.infoBox}>
      { (showUsdValue && !loading) && (
        <Typography 
          fontSize={13}
          fontWeight={EFontWeight.SEMI_BOLD}
          color={EColor.RHYTM}
        >
          {header}
        </Typography>
      )}
      <Typography
        className={styles.infoValue}
        fontSize={19}
        fontWeight={EFontWeight.BOLD}
      >
        <Skeleton loading={loading}>
          {value}
        </Skeleton>
      </Typography>
      <Typography
        fontSize={13}
        fontWeight={EFontWeight.SEMI_BOLD}
        color={EColor.RHYTM}
      >
        {footer}
      </Typography>
    </div>
  );
};

export default InfoBox;
