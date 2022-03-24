import React from "react";
import {tokenIcons} from "../../../shared/constants/common.constants";
import {ESupportedTokens} from "../../../shared/types/vault.types";
import InfoBox from "../../atoms/InfoBox/infoBox.atom";
import TokenDetail from "../../atoms/TokenDetail/tokenDetail.atom";
import {EAssetType} from "../../atoms/TokenDetail/tokenDetail.atom.types";
import styles from "./vaultHeader.molecule.module.scss";
import {IVaultHeader} from "./vaultHeader.molecule.types";

const VaultHeader: React.FC<IVaultHeader> = (props) => {
  const {onClick} = props;

  return (
    <div onClick={onClick} className={styles.vaultHeader}>
      <div className={styles.tokenInfoColumn}>
        <TokenDetail
          assetType={EAssetType.Token}
          name="Matic"
          purchaseLink="https://test.com"
          logo={tokenIcons[ESupportedTokens.WMATIC]}
        />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox usdValue="$12,000" value="2" footer="Wallet" />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox value="0" footer="Deposited" />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox value="5%" footer="APY" />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox value="$5,223,562" footer="TVL" />
      </div>
    </div>
  );
};

export default VaultHeader;
