import React from "react";
import {EColor, EFontWeight} from "../../../shared/types/styles.types";
import Skeleton from "../Skeleton/skeleton.atom";
import Typography from "../Typography/typography.atom";
import { IInfoBox } from "./infoBox.atom.types";
import styles from "./infoBox.atom.module.scss";

const InfoBox: React.FC<IInfoBox> = (props) => {
  const {header, value, footer, loading = false} = props;

  return (
    <div className={styles.infoBox}>
      { header && (
        <Typography 
          maximize
          textAlign="center"
          fontSize={13}
          fontWeight={EFontWeight.REGULAR}
          color={EColor.RHYTM}
        >
          {header}
        </Typography>
      )}
      <Typography
        className={styles.infoValue}
        fontSize={19}
        fontWeight={EFontWeight.BOLD}
        textAlign="center"
        maximize
      >
        <Skeleton loading={loading}>
          {value}
        </Skeleton>
      </Typography>
      <Typography
        maximize
        fontSize={13}
        fontWeight={EFontWeight.REGULAR}
        color={EColor.RHYTM}
        textAlign="center"
      >
        {footer}
      </Typography>
    </div>
  );
};

export default InfoBox;
