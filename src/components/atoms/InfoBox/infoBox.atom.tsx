import React from "react";
import { IInfoBox } from "./infoBox.atom.types";
import styles from "./infoBox.atom.module.scss";

const InfoBox: React.FC<IInfoBox> = (props) => {
  const {usdValue, value, footer} = props;

  return (
    <div className={styles.infoBox}>
      { usdValue && <p className={styles.label}>{usdValue}</p>}
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{footer}</p>
    </div>
  );
};

export default InfoBox;
