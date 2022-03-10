import React from "react";
import Typography from "../../atoms/Typography/typography.atom";
import { CONNECTOR_LABELS, CONNECTOR_LOGOS, supportedConnectorList } from "../../../shared/constants/web3.constants";
import { EColor, EFontWeight } from "../../../shared/types/styles.types";


const WalletList: React.FC = () => {
  const renderSupportedWallets = () => {
    return supportedConnectorList.map((type_) => (
      <li>
        <Typography 
          color={EColor.BLACK} 
          fontSize={24} 
          fontWeight={EFontWeight.BOLD}
        >
          {CONNECTOR_LABELS[type_]}
        </Typography>
      </li>
    ))
  }
  return (
    <ul>
      {renderSupportedWallets()} 
    </ul>
  );
}

export default WalletList;
