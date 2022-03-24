import React from "react";
import { ITokenDetail } from "./tokenDetail.atom.types";
import styles from "./tokenDetail.atom.module.scss";

const TokenDetail: React.FC<ITokenDetail> = (props) => {
  const {assetType, logo: Logo, name, purchaseLink} = props;
  
  return (
    <div className={styles.tokenDetail}>
      <div>
        <Logo className={styles.logo} /> 
      </div>
      <div className={styles.tokenLabel}>
        <p className={styles.tokenName}>{name}</p>
        <a className={styles.purchaseLink} href={purchaseLink}>{assetType}</a>
      </div>
    </div>
  );
};

export default TokenDetail;
