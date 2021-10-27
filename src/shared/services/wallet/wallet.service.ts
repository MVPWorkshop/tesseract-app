import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { EChainId, EConnectorType } from "../../types/web3.types";
import { RPC_PROVIDER_POLYGON, PROVIDER_POLLING_INTERVAL } from "../../constants/config.constants";
import { RPC_URLS, supportedChainIds } from "../../constants/web3.constants";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { hexStripZeros } from "ethers/lib/utils";
import { BigNumber } from "ethers";

class WalletService {
  private static _polygonRpcProvider = new JsonRpcProvider(RPC_PROVIDER_POLYGON);

  public static rpcProvider(chainId: EChainId): JsonRpcProvider {
    switch (chainId) {
      case EChainId.POLYGON_MAINNET: {
        return this._polygonRpcProvider;
      }
    }
  }

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

  public static async switchToNetwork(library: Web3Provider, chainId: EChainId): Promise<null | void> {
    if (!library?.provider?.request) {
      return;
    }
    const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
    return library?.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: formattedChainId }],
    });
  }
}

export default WalletService;
