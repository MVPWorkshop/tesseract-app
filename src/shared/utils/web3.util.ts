import { SUPPORTED_CHAIN_IDS } from "../constants/config.constants";

class Web3Util {
  public static isActiveChainSupported(chainId: number): boolean {
    if (chainId) {
      return SUPPORTED_CHAIN_IDS.includes(chainId);
    } else {
      return false;
    }
  }
}

export default Web3Util;
