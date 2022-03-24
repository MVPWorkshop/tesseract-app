import React from "react";
import { useSelector } from "react-redux";
import BigDecimal from "js-big-decimal";
import {tokenIcons} from "../../../shared/constants/common.constants";
import {buyTokenUrlByTokenAndNetwork, tokenLabels} from "../../../shared/constants/web3.constants";
import {formatAssetDisplayValue} from "../../../shared/utils/common.util";
import InfoBox from "../../atoms/InfoBox/infoBox.atom";
import TokenDetail from "../../atoms/TokenDetail/tokenDetail.atom";
import {EAssetType} from "../../atoms/TokenDetail/tokenDetail.atom.types";
import styles from "./vaultHeader.molecule.module.scss";
import {IVaultHeader} from "./vaultHeader.molecule.types";
import {getTokenInUSD} from "../../../shared/utils/vault.util";
import {RootState} from "../../../redux/redux.types";
import {ITokenReduxState} from "../../../redux/tokens/tokens.redux.types";

const VaultHeader: React.FC<IVaultHeader> = (props) => {
  const {onClick, token, chainId, vaultData} = props;
  const {
    decimals,
    priceUSD,
  } = useSelector<RootState, ITokenReduxState>(state => state.tokens[token]);
  const tokenLogo = tokenIcons[token];
  const buyTokenUrl = buyTokenUrlByTokenAndNetwork[token][chainId];
  const vaultAPY = (vaultData && vaultData.apy) ? (new BigDecimal(vaultData.apy * 100)) : null;
  const apy = formatAssetDisplayValue(vaultAPY?.round(2).getValue())

  // const tvl = (vaultData && vaultData.tvl && priceUSD && decimals) ? getTokenInUSD(vaultData.tvl, priceUSD, decimals) : null;

  const getFormattedTVL = () => {
    if (vaultData && vaultData.tvl && priceUSD && decimals) {
      const tvl = getTokenInUSD(vaultData.tvl, priceUSD, decimals);
      return formatAssetDisplayValue(tvl?.getValue(), { humanize: true })
    }
    return null;
  }


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
        <InfoBox value={getFormattedTVL()} footer="TVL" />
      </div>
    </div>
  );
};

export default VaultHeader;
