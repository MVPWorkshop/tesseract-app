import React from "react";
import { ITokenDetail } from "./tokenDetail.atom.types";
import styles from "./tokenDetail.atom.module.scss";
import Typography from "../Typography/typography.atom";
import {EFontWeight} from "../../../shared/types/styles.types";
import Link from "../Link/link.atom";

const TokenDetail: React.FC<ITokenDetail> = (props) => {
  const {assetType, logo: Logo, name, purchaseLink} = props;
  
  return (
    <div className={styles.tokenDetail}>
      <div>
        <Logo className={styles.logo} /> 
      </div>
      <div className={styles.tokenLabel}>
        <Typography
          fontSize={16}
          fontWeight={EFontWeight.BOLD}
        >
          {name}
        </Typography>
        <Link className={styles.purchaseLink} link={purchaseLink}>{assetType}</Link>
      </div>
    </div>
  );
};

export default TokenDetail;
