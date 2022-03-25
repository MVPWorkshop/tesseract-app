import { EChainId } from "../types/web3.types";
import { addressByNetworkAndToken, arbirtrayChainDataById } from "../constants/web3.constants";
import { isZero, keys } from "./common.util";
import BigDecimal from "js-big-decimal";
import Web3Util from "./web3.util";
import { BigNumber } from "ethers";
import { ESupportedTokens } from "../types/vault.types";
import { ERoutes } from "../../router/router.types";

export function getSupportedTokensByChain(chain: EChainId): ESupportedTokens[] {
  const allTokens = keys(ESupportedTokens);

  const supportedTokens: ESupportedTokens[] = [];
  for (let i = 0; i < allTokens.length; i++) {
    const token = allTokens[i];
    const isTokenOnNetwork = !!addressByNetworkAndToken[token][chain];

    if (isTokenOnNetwork) {
      supportedTokens.push(token as ESupportedTokens);
    }
  }

  return supportedTokens;
}

type SupportedNumbers = string | number | BigNumber;
export function getTokenInUSD(assetValue: SupportedNumbers, priceUSD: SupportedNumbers, decimals: number): BigDecimal {
  const bigDecimalAssetValue = new BigDecimal(assetValue.toString());
  const bigDecimalPriceUSD = new BigDecimal(priceUSD.toString());

  const assetInUSD = bigDecimalAssetValue.multiply(bigDecimalPriceUSD);
  return Web3Util.formatTokenNumber(assetInUSD.getValue(), decimals, 2);
}

export function getShareInFormattedToken(shares: SupportedNumbers, pricePerShare: SupportedNumbers, decimals: number): BigDecimal {
  const bigDecimalShares = new BigDecimal(shares.toString());
  const bigDecimalPricePerShare = new BigDecimal(pricePerShare.toString());
  console.log("DECIMALS", bigDecimalShares, bigDecimalPricePerShare);
  const sharesInToken = bigDecimalShares.multiply(bigDecimalPricePerShare);
  return Web3Util.formatTokenNumber(sharesInToken.getValue(), decimals * 2);
}

export function getShareInUSD(shares: SupportedNumbers, pricePerShare: SupportedNumbers, priceUSD: SupportedNumbers, decimals: number): BigDecimal {
  const amountInTokens = getShareInFormattedToken(shares, pricePerShare, decimals);
  const bigDecimalPriceUSD = new BigDecimal(priceUSD.toString());

  return amountInTokens.multiply(bigDecimalPriceUSD).round(2);
}

// Formatted implies the value of the token is a float instead of integer with imagined decimals
export function formattedTokenToShare(amount: SupportedNumbers, pricePerShare: SupportedNumbers, decimals: number): BigDecimal {
  const precisionDenominator = new BigDecimal(`1.0e${decimals * 2}`);

  const bigDecimalAmount = new BigDecimal(amount.toString()).multiply(precisionDenominator);
  const bigDecimalPricePerShare = new BigDecimal(pricePerShare.toString());

  return bigDecimalAmount.divide(bigDecimalPricePerShare, 64).floor();
}

export function getMaxDepositAmount(userBalance: BigNumber, availableDepositLimit: BigNumber) {
  if (availableDepositLimit && !isZero(availableDepositLimit)) {
    if (availableDepositLimit.lt(userBalance)) {
      return availableDepositLimit;
    } else {
      return userBalance;
    }
  } else {
    return BigNumber.from(0);
  }
}

export function getTokenTicker(tokenSymbol: string, chainId: EChainId): string {
  if (chainId === EChainId.POLYGON_MAINNET && tokenSymbol === "WMATIC") {
    return arbirtrayChainDataById[chainId].tokenTicker;
  }
  if (chainId === EChainId.AVAX_MAINNET && tokenSymbol === "WAVAX") {
    return arbirtrayChainDataById[chainId].tokenTicker;
  }

  return tokenSymbol;
}

export function getVaultPageRoute(chainId: EChainId): string {
  const routeNetworkParam = arbirtrayChainDataById[chainId].routeParam;
  return `${ERoutes.VAULTS}/${routeNetworkParam}`;
}
