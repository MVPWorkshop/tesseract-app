import { AllKeysRequired, DynamicObject, SvgComponent } from "../types/util.types";
import { EChainId, EConnectorType } from "../types/web3.types";
import { EXPLORER_POLYGON_MAINNET, POLYGON_MAINNET_RPC_URL } from "./config.constants";
import { ReactComponent as MetamaskLogoSVG } from "../assets/metamask-logo.svg";
import { ReactComponent as WalletConnectLogoSVG } from "../assets/walletconnect-logo.svg";
import { ESupportedTokens, TokenAddressByNetwork } from "../types/contract.types";

export const RPC_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: POLYGON_MAINNET_RPC_URL
};

export const EXPLORER_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: EXPLORER_POLYGON_MAINNET
};

export const CONNECTOR_LABELS: DynamicObject<string, EConnectorType, AllKeysRequired> = {
  [EConnectorType.INJECTED]: "Metamask",
  [EConnectorType.WALLET_CONNECT]: "Wallet Connect"
};

export const CONNECTOR_LOGOS: DynamicObject<SvgComponent, EConnectorType, AllKeysRequired> = {
  [EConnectorType.INJECTED]: MetamaskLogoSVG,
  [EConnectorType.WALLET_CONNECT]: WalletConnectLogoSVG
};

export const supportedConnectorList: EConnectorType[] = [
  EConnectorType.INJECTED,
  EConnectorType.WALLET_CONNECT
];

export const supportedChainIds: EChainId[] = [
  EChainId.POLYGON_MAINNET
];

export const addressByNetworkAndToken: TokenAddressByNetwork = {
  [ESupportedTokens.USDC]: {
    [EChainId.POLYGON_MAINNET]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
  },
  [ESupportedTokens.USDT]: {
    [EChainId.POLYGON_MAINNET]: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
  },
  [ESupportedTokens.DAI]: {
    [EChainId.POLYGON_MAINNET]: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
  },
  [ESupportedTokens.WETH]: {
    [EChainId.POLYGON_MAINNET]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
  },
  [ESupportedTokens.WBTC]: {
    [EChainId.POLYGON_MAINNET]: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6"
  }
};
