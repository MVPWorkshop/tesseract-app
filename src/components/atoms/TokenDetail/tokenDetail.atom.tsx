import React from "react";
import { ITokenDetail } from "./tokenDetail.atom.types";
import styles from "./tokenDetail.atom.module.scss";
import Typography from "../Typography/typography.atom";
import {EFontWeight} from "../../../shared/types/styles.types";
import Link from "../Link/link.atom";

const TokenDetail: React.FC<ITokenDetail> = (props) => {
  const {assetTypeLabel, logo: Logo, name, purchaseLink} = props;
  
  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
  };

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
        {purchaseLink && <Link onClick={onClick} className={styles.purchaseLink} link={purchaseLink}>{assetTypeLabel}</Link>}
      </div>
    </div>
  );
};

export default TokenDetail;
