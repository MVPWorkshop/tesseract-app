import React from "react";
import BigDecimal from "js-big-decimal";
import {tokenIcons} from "../../../shared/constants/common.constants";
import {buyTokenUrlByTokenAndNetwork, tokenLabels} from "../../../shared/constants/web3.constants";
import {formatAssetDisplayValue} from "../../../shared/utils/common.util";
import InfoBox from "../../atoms/InfoBox/infoBox.atom";
import TokenDetail from "../../atoms/TokenDetail/tokenDetail.atom";
import {EAssetType} from "../../atoms/TokenDetail/tokenDetail.atom.types";
import styles from "./vaultHeader.molecule.module.scss";
import {IVaultHeader} from "./vaultHeader.molecule.types";

const VaultHeader: React.FC<IVaultHeader> = (props) => {
  const {onClick, token, chainId, vaultData} = props;
  const tokenLogo = tokenIcons[token];
  const buyTokenUrl = buyTokenUrlByTokenAndNetwork[token][chainId];
  const vaultAPY = (vaultData && vaultData.apy) ? (new BigDecimal(vaultData.apy * 100)) : null;
  const apy = formatAssetDisplayValue(vaultAPY?.round(2).getValue())

  const getTokenLabel = () => {
    if (tokenLabels[token] && tokenLabels[token][chainId]) {
      return tokenLabels[token][chainId];
    }

    return token;
  }

  return (
    <div onClick={onClick} className={styles.vaultHeader}>
      <div className={styles.tokenInfoColumn}>
        <TokenDetail
          assetType={EAssetType.Token}
          name={getTokenLabel()!}
          purchaseLink={buyTokenUrl}
          logo={tokenLogo}
        />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox usdValue="$12,000" value="2" footer="Wallet" />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox value="0" footer="Deposited" />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox value={`${apy}%`} footer="APY" />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox value="$5,223,562" footer="TVL" />
      </div>
    </div>
  );
};

export default VaultHeader;
