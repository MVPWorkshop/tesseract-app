import React from "react";
import { useSelector } from "react-redux";
import BigDecimal from "js-big-decimal";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import {tokenIcons, tokenTypes, assetTypeLabel} from "../../../shared/constants/common.constants";
import {buyTokenUrlByTokenAndNetwork, tokenLabels} from "../../../shared/constants/web3.constants";
import {formatAssetDisplayValue} from "../../../shared/utils/common.util";
import InfoBox from "../../atoms/InfoBox/infoBox.atom";
import {getShareInFormattedToken, getTokenInUSD} from "../../../shared/utils/vault.util";
import {RootState} from "../../../redux/redux.types";
import {ITokenReduxState} from "../../../redux/tokens/tokens.redux.types";
import Web3Util from "../../../shared/utils/web3.util";
import TokenDetail from "../../atoms/TokenDetail/tokenDetail.atom";
import styles from "./vaultHeader.molecule.module.scss";
import {IVaultHeader} from "./vaultHeader.molecule.types";


const VaultHeader: React.FC<IVaultHeader> = (props) => {
  const {onClick, token, chainId, vaultData, loading} = props;
  const {
    decimals,
    priceUSD,
    balance,
  } = useSelector<RootState, ITokenReduxState>(state => state.tokens[token]);
  
  const tokenLogo = tokenIcons[token];
  const buyTokenUrl = buyTokenUrlByTokenAndNetwork[token][chainId];
  const vaultAPY = (vaultData && vaultData.apy) ? (new BigDecimal(vaultData.apy * 100)) : null;
  const apy = formatAssetDisplayValue(vaultAPY?.round(2).getValue());
  
  const getFormattedUserShares = () => {
    if (vaultData && vaultData.userShares && vaultData.sharePrice && decimals) {
      const formattedUserShares = getShareInFormattedToken(
        vaultData.userShares, 
        vaultData.sharePrice, 
        decimals
      ).round(6);

      return formatAssetDisplayValue(formattedUserShares?.getValue());
    }

    return "0";
  };

  const getFormattedTVL = () => {
    if (vaultData && vaultData.tvl && priceUSD && decimals) {
      const tvl = getTokenInUSD(vaultData.tvl, priceUSD, decimals);

      return formatAssetDisplayValue(tvl?.getValue(), { humanize: true });
    }

    return "0";
  };

  const getTokenLabel = () => {
    if (tokenLabels[token] && tokenLabels[token][chainId]) {
      return tokenLabels[token][chainId];
    }

    return token;
  };

  const getFormattedBalance = () => {
    if (balance && decimals) {
      const formattedBalance = Web3Util.formatTokenNumber(balance, decimals, 6);
      return formatAssetDisplayValue(formattedBalance?.getValue());
    }

    return "0";
  };

  const getFormattedBalanceInUSD = () => {
    if (balance && priceUSD && decimals) {
      const depositValue = getTokenInUSD(balance, priceUSD, decimals);
      return formatAssetDisplayValue(depositValue?.getValue(), {humanize: true});
    }

    return null;
  };

  const getDepositedValueInUSD = () => {
    if (vaultData?.userShares && priceUSD && decimals) {
      const depositValue = getTokenInUSD(vaultData?.userShares, priceUSD, decimals);
      return formatAssetDisplayValue(depositValue?.getValue(), {humanize: true});
    }

    return null;
  };

  const getHeaderValue = (infoBoxValue: string, headerValue: string) => {
    if (!!infoBoxValue && !["0", "$0"].includes(infoBoxValue)) {
      return headerValue;
    }

    return null;
  };

  const formattedBalance = getFormattedBalance();
  const formattedUserShares = getFormattedUserShares();

  return (
    <div onClick={onClick} className={styles.vaultHeader}>
      <div className={styles.tokenInfoColumn}>
        <TokenDetail
          assetTypeLabel={assetTypeLabel[tokenTypes[token]]}
          name={getTokenLabel()!}
          purchaseLink={buyTokenUrl}
          logo={tokenLogo}
        />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox 
          header={getHeaderValue(formattedBalance, getFormattedBalanceInUSD())}
          value={formattedBalance} 
          footer={i18n._(t`Balance`)}
          loading={loading}
        />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox 
          header={getHeaderValue(formattedUserShares, getDepositedValueInUSD())}
          value={formattedUserShares} 
          footer={i18n._(t`Deposited`)}
          loading={loading}
        />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox 
          value={`${apy}%`} 
          footer={i18n._(t`APY`)}
          loading={loading}
        />
      </div>
      <div className={styles.tokenDataColumn}>
        <InfoBox value={getFormattedTVL()} footer={i18n._(t`TVL`)} loading={loading} />
      </div>
    </div>
  );
};

export default VaultHeader;
