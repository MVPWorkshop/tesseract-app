import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { EConnectorType } from "../types/web3.types";
import { PROVIDER_POLLING_INTERVAL } from "../constants/config.constants";
import { RPC_URLS, supportedChainIds } from "../constants/web3.constants";

class WalletService {
  private static _injectedProvider = new InjectedConnector({ supportedChainIds })

  public static get injected() {
    return this._injectedProvider;
  }

  private static _walletConnect =
    new WalletConnectConnector({
      rpc: RPC_URLS,
      qrcode: true,
      pollingInterval: PROVIDER_POLLING_INTERVAL
    })

  public static get walletConnect() {
    return this._walletConnect;
  }

  public static typeToProvider(type: EConnectorType) {
    return {
      [EConnectorType.INJECTED]: this._injectedProvider,
      [EConnectorType.WALLET_CONNECT]: this._walletConnect
    }[type];
  }

  public static providerToType(connector?: AbstractConnector) {
    if (connector) {
      if (connector === this._injectedProvider) {
        return EConnectorType.INJECTED;
      } else if (connector === this._walletConnect) {
        return EConnectorType.WALLET_CONNECT;
      }
    }
  }
}

export default WalletService;
