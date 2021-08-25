import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { EChainId, EConnectorType } from "../types/web3.types";
import {
  POLYGON_MAINNET_RPC_URL,
  POLYGON_MUMBAI_RPC_URL,
  PROVIDER_POLLING_INTERVAL
} from "../constants/config.constants";

class WalletService {
  private static _injectedProvider =
    new InjectedConnector({
      supportedChainIds: [EChainId.POLYGON_MAINNET, EChainId.POYLGON_MUMBAI]
    })

  public static get injected() {
    return this._injectedProvider;
  }

  private static _walletConnect =
    new WalletConnectConnector({
      rpc: {
        [EChainId.POLYGON_MAINNET]: POLYGON_MAINNET_RPC_URL,
        [EChainId.POYLGON_MUMBAI]: POLYGON_MUMBAI_RPC_URL
      },
      qrcode: true,
      pollingInterval: PROVIDER_POLLING_INTERVAL
    })

  public static get walletConnect() {
    return this._walletConnect;
  }

  public static typeToProvider() {
    return {
      [EConnectorType.INJECTED]: this._injectedProvider,
      [EConnectorType.WALLET_CONNECT]: this._walletConnect
    };
  }
}

export default WalletService;
