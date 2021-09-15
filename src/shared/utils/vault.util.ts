import { EChainId } from "../types/web3.types";
import { ESupportedTokens } from "../types/contract.types";
import { addressByNetworkAndToken } from "../constants/web3.constants";
import { keys } from "./common.util";

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
