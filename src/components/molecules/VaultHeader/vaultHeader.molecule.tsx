import React from "react";
import {tokenIcons} from "../../../shared/constants/common.constants";
import {ESupportedTokens} from "../../../shared/types/vault.types";
import InfoBox from "../../atoms/InfoBox/infoBox.atom";
import TokenDetail from "../../atoms/TokenDetail/tokenDetail.atom";
import {AssetType} from "../../atoms/TokenDetail/tokenDetail.atom.types";
import styles from "./vaultHeader.molecule.module.scss";

const VaultHeader: React.FC = () => {
  return (
    <div className={styles.vaultHeader}>
      <div style={{ flexGrow: 2 }}>
        <TokenDetail
          assetType={AssetType.Token}
          name="Matic"
          purchaseLink="https://test.com"
          logo={tokenIcons[ESupportedTokens.WMATIC]}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <InfoBox usdValue="$12,000" value="2" footer="Wallet" />
      </div>
      <div style={{ flexGrow: 1 }}>
        <InfoBox value="0" footer="Deposited" />
      </div>
      <div style={{flexGrow: 1 }}>
        <InfoBox value="5%" footer="APY" />
      </div>
      <div style={{ flexGrow: 1 }}>
        <InfoBox value="$5,223,562" footer="TVL" />
      </div>
    </div>
  );
};

export default VaultHeader;

