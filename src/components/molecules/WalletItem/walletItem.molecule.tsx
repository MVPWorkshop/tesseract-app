import React from "react";
import { CONNECTOR_METADATA } from "../../../shared/constants/web3.constants";
import { EColor, EFontWeight } from "../../../shared/types/styles.types";
import Typography from "../../atoms/Typography/typography.atom";
import { IWalletItem } from "./walletItem.molecule.types";
import styles from "./walletItem.molecule.module.scss";

const WalletItem: React.FC<IWalletItem> = (props) => {
  const { connectorType, onClick } = props;
  const { label, description, logo: Logo } = CONNECTOR_METADATA[connectorType];

  return (
    <li
      key={connectorType}
      onClick={onClick}
      className={styles.walletItem}
    >
      <Logo className={styles.walletLogo} />
      <Typography
        color={EColor.BLACK}
        fontSize={24}
        fontWeight={EFontWeight.BOLD}
      >
        {label}
      </Typography>
      <Typography
        color={EColor.DARK_GREY}
        fontSize={18}
      >
        {description}
      </Typography>
    </li>
  );
};

export default WalletItem;
