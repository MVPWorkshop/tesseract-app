import { SUPPORTED_CHAIN_IDS } from "../constants/config.constants";
import { Nullable } from "../types/util.types";
import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as InjectedRejectedRequestError
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as WalletConnectRejectedRequestError } from "@web3-react/walletconnect-connector";
import { EErrorTypes } from "../types/error.types";

class Web3Util {
  public static isActiveChainSupported(chainId: Nullable<number>): boolean {
    if (chainId) {
      return SUPPORTED_CHAIN_IDS.includes(chainId);
    } else {
      return false;
    }
  }

  public static getFormattedAddress(address: string): string {
    return address.substr(0, 6) + "..." + address.substr(-4);
  }

  public static mapConnectorError(error: Error): EErrorTypes {
    if (error instanceof UnsupportedChainIdError) {
      return EErrorTypes.UNSUPPORTED_CHAIN;
    } else if (error instanceof NoEthereumProviderError) {
      return EErrorTypes.NO_ETHEREUM_PROVIDER;
    } else if (error instanceof InjectedRejectedRequestError || error instanceof WalletConnectRejectedRequestError) {
      return EErrorTypes.USER_REJECTED_REQUEST;
    }

    return EErrorTypes.UNKNOWN_ERROR;
  }

  public static isProviderInjected(): boolean {
    return !!window.ethereum || !!window.web3;
  }
}


export default Web3Util;
