import React from "react";
import Typography from "../../atoms/Typography/typography.atom";
import { CONNECTOR_LABELS, CONNECTOR_LOGOS, CONNECTOR_DESCRIPTIONS, supportedConnectorList } from "../../../shared/constants/web3.constants";
import { EColor, EFontWeight } from "../../../shared/types/styles.types";
import {EConnectorType} from "../../../shared/types/web3.types";
import styles from "./walletList.organism.module.scss"

const WalletList: React.FC = () => {
  const test = () => {
    console.log("TEST CLICK");
  };

  const renderSupportedWallets = () => (
    supportedConnectorList.map((type_: EConnectorType) => {
      const Logo = CONNECTOR_LOGOS[type_];

      return (
        <li key={type_} onClick={test} className={styles.walletItem}>
          <Logo className={styles.walletLogo}/>
          <Typography 
            color={EColor.BLACK} 
            fontSize={24} 
            fontWeight={EFontWeight.BOLD}
          >
            {CONNECTOR_LABELS[type_]}
          </Typography>
          <Typography
            color={EColor.DARK_GREY}
            fontSize={18}
          >
            {CONNECTOR_DESCRIPTIONS[type_]}
          </Typography> 
        </li>
      );
    })
  );

  return (
    <ul className={styles.walletList}>
      {renderSupportedWallets()} 
    </ul>
  );
};

export default WalletList;
