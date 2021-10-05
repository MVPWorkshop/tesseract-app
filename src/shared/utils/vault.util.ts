import { EChainId } from "../types/web3.types";
import { ESupportedTokens } from "../types/contract.types";
import { addressByNetworkAndToken } from "../constants/web3.constants";
import { keys } from "./common.util";
import BigDecimal from "js-big-decimal";
import Web3Util from "./web3.util";
import { BigNumber } from "ethers";

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

export function getShareInToken(shares: SupportedNumbers, pricePerShare: SupportedNumbers, decimals: number): BigDecimal {
  const bigDecimalShares = new BigDecimal(shares.toString());
  const bigDecimalPricePerShare = new BigDecimal(pricePerShare.toString());

  const sharesInToken = bigDecimalShares.multiply(bigDecimalPricePerShare);
  return Web3Util.formatTokenNumber(sharesInToken.getValue(), decimals * 2);
}

export function getShareInUSD(shares: SupportedNumbers, pricePerShare: SupportedNumbers, priceUSD: SupportedNumbers, decimals: number): BigDecimal {
  const amountInTokens = getShareInToken(shares, pricePerShare, decimals);
  const bigDecimalPriceUSD = new BigDecimal(priceUSD.toString());

  return amountInTokens.multiply(bigDecimalPriceUSD).round(2);
}
