import React from "react";
import { IInfoBox } from "./infoBox.atom.types";
import styles from "./infoBox.atom.module.scss";
import Typography from "../Typography/typography.atom";
import {EColor, EFontWeight} from "../../../shared/types/styles.types";

const InfoBox: React.FC<IInfoBox> = (props) => {
  const {usdValue, value, footer} = props;
  // temp - find a better way to handle this
  const showUsdValue = usdValue && usdValue !== "$0"; 

  return (
    <div className={styles.infoBox}>
      { showUsdValue && (
        <Typography 
          fontSize={13}
          fontWeight={EFontWeight.SEMI_BOLD}
          color={EColor.RHYTM}
        >
          {usdValue}
        </Typography>
      )}
      <Typography
        fontSize={19}
        fontWeight={EFontWeight.BOLD}
      >
        {value}
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
