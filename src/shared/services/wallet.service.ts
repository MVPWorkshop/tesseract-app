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
      rpc: supportedChainIds.map(chainId => RPC_URLS[chainId]),
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
}

export default WalletService;
