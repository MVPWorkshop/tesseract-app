import { AllKeysRequired, DynamicObject, SvgComponent } from "../types/util.types";
import { EChainId, EConnectorType } from "../types/web3.types";
import { EXPLORER_POLYGON_MAINNET, POLYGON_MAINNET_RPC_URL } from "./config.constants";
import { ReactComponent as MetamaskLogoSVG } from "../assets/metamask-logo.svg";
import { ReactComponent as WalletConnectLogoSVG } from "../assets/walletconnect-logo.svg";
import { TokenAddressByNetwork } from "../types/contract.types";
import { ESupportedTokens } from "../types/vault.types";

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
  },
  [ESupportedTokens.DAI]: {
    [EChainId.POLYGON_MAINNET]: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
  },
  [ESupportedTokens.WETH]: {
    [EChainId.POLYGON_MAINNET]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
  },
  [ESupportedTokens.WBTC]: {
    [EChainId.POLYGON_MAINNET]: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6"
  },
  [ESupportedTokens.WMATIC]: {
    [EChainId.POLYGON_MAINNET]: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
  },
  [ESupportedTokens.CRVTRICRYPTO]: {
    [EChainId.POLYGON_MAINNET]: "0xdAD97F7713Ae9437fa9249920eC8507e5FbB23d3"
  }
};

export const nativeTokenTickers: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: "MATIC"
};

export const chainLabels: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: "POLYGON"
};

export const tokenLabels: DynamicObject<string, ESupportedTokens> = {
  [ESupportedTokens.CRVTRICRYPTO]: "3CRV"
};

// @TODO Abstract a bit more
export const buyTokenUrlByTokenAndNetwork: DynamicObject<DynamicObject<string, EChainId>, ESupportedTokens, AllKeysRequired> = {
  [ESupportedTokens.USDC]: {},
  [ESupportedTokens.USDT]: {},
  [ESupportedTokens.DAI]: {},
  [ESupportedTokens.WETH]: {},
  [ESupportedTokens.WBTC]: {},
  [ESupportedTokens.WMATIC]: {},
  [ESupportedTokens.CRVTRICRYPTO]: {
    [EChainId.POLYGON_MAINNET]: "https://polygon.curve.fi/atricrypto3/deposit"
  }
};
