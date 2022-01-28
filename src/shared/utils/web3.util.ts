import { SUPPORTED_CHAIN_IDS } from "../constants/config.constants";
import { Nullable } from "../types/util.types";
import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as InjectedRejectedRequestError
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as WalletConnectRejectedRequestError } from "@web3-react/walletconnect-connector";
import { EErrorTypes, WalletConnectorError } from "../types/error.types";
import { EChainId } from "../types/web3.types";
import { EXPLORER_URLS, arbirtrayChainDataById, supportedChainIds } from "../constants/web3.constants";
import BigDecimal from "js-big-decimal";
import { BigNumber } from "ethers";
import { setMulticallAddress } from "ethers-multicall";

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

  public static mapConnectorError(error: Error): WalletConnectorError {
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

  public static getExplorerBaseUrl(chainId: number) {
    if (this.isActiveChainSupported(chainId)) {
      const link = EXPLORER_URLS[chainId as EChainId];

      if (link[-1] === "/") {
        return link.slice(0, -1);
      } else {
        return link;
      }
    }
  }

  public static getExplorerLink(chainId: number, data: string, type: "account" | "tx") {
    const baseUrl = this.getExplorerBaseUrl(chainId);

    if (baseUrl && data) {
      if (type === "account") {
        return `${baseUrl}/address/${data}`;
      }
      if (type === "tx") {
        return `${baseUrl}/tx/${data}`;
      }
    }
  }

  public static formatTokenNumber(number: string | BigNumber, decimals: number, precision?: number): BigDecimal {
    const precisionDenominator = new BigDecimal(`1.0e${decimals}`);
    const bigDecimalValue = new BigDecimal(number.toString());

    const actualValue = bigDecimalValue.divide(precisionDenominator, 64);
    if (precision) {
      return actualValue.round(precision);
    } else {
      return actualValue;
    }
  }

  public static initMulticall(): void {
    supportedChainIds.forEach(chainId => {
      const multicallAddress = arbirtrayChainDataById[chainId].multicallAddress;

      setMulticallAddress(chainId, multicallAddress);
    });
  }
}


export default Web3Util;
