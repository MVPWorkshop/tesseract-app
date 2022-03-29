import {i18n} from "@lingui/core";
import { t } from "@lingui/macro";
import { AllKeysRequired, DynamicObject } from "../types/util.types";
import {IUtilChainData} from "../types/metadata.types";
import { EChainId, EConnectorType } from "../types/web3.types";
import { IConnectorMetadata } from "../types/metadata.types";
import {
  EXPLORER_AVAX_MAINNET,
  EXPLORER_POLYGON_MAINNET,
  RPC_PROVIDER_AVAX,
  RPC_PROVIDER_POLYGON
} from "./config.constants";

import { ReactComponent as MetamaskLogoSVG } from "../assets/metamask-logo.svg";
import { ReactComponent as WalletConnectLogoSVG } from "../assets/walletconnect-logo.svg";
import { ReactComponent as PolygonLogo } from "../assets/networks/polygon.svg";
import { ReactComponent as AvaxLogo } from "../assets/networks/avax.svg";

import { ValueByTokenAndNetwork } from "../types/contract.types";
import { ESupportedTokens } from "../types/vault.types";
import { ERouteNetwork } from "../../router/router.types";

export const RPC_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: RPC_PROVIDER_POLYGON,
  [EChainId.AVAX_MAINNET]: RPC_PROVIDER_AVAX
};

export const EXPLORER_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: EXPLORER_POLYGON_MAINNET,
  [EChainId.AVAX_MAINNET]: EXPLORER_AVAX_MAINNET
};

export const CONNECTOR_METADATA: DynamicObject<IConnectorMetadata, EConnectorType, AllKeysRequired> = {
  [EConnectorType.INJECTED]: {
    label: "Metamask",
    description: i18n._(t`Connect your metamask wallet`),
    logo: MetamaskLogoSVG,
  },
  [EConnectorType.WALLET_CONNECT]: {
    label: "Wallet Connect",
    description: i18n._(t`Scan with WalletConnect to connect`),
    logo: WalletConnectLogoSVG,
  } 
};

export const supportedConnectorList: EConnectorType[] = [
  EConnectorType.INJECTED,
  EConnectorType.WALLET_CONNECT
];

export const supportedChainIds: EChainId[] = [
  EChainId.POLYGON_MAINNET,
  EChainId.AVAX_MAINNET
];

export const addressByNetworkAndToken: ValueByTokenAndNetwork = {
  [ESupportedTokens.USDC]: {
    [EChainId.POLYGON_MAINNET]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    [EChainId.AVAX_MAINNET]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"
  },
  [ESupportedTokens.USDT]: {
  },
  [ESupportedTokens.DAI]: {
    [EChainId.POLYGON_MAINNET]: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    [EChainId.AVAX_MAINNET]: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"
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
  [ESupportedTokens.WAVAX]: {
    [EChainId.AVAX_MAINNET]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
  },
  [ESupportedTokens.CRVTRICRYPTO]: {
    [EChainId.POLYGON_MAINNET]: "0xdAD97F7713Ae9437fa9249920eC8507e5FbB23d3",
    [EChainId.AVAX_MAINNET]: "0x1daB6560494B04473A0BE3E7D83CF3Fdf3a51828"
  }
};

export const arbirtrayChainDataById: DynamicObject<IUtilChainData, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: {
    tokenTicker: "MATIC",
    label: "POLYGON",
    multicallAddress: "0xc4f1501f337079077842343Ce02665D8960150B0",
    routeParam: ERouteNetwork.POLYGON,
    logo: PolygonLogo
  },
  [EChainId.AVAX_MAINNET]: {
    tokenTicker: "AVAX",
    label: "AVALANCHE",
    multicallAddress: "0x7f3aC7C283d7E6662D886F494f7bc6F1993cDacf",
    routeParam: ERouteNetwork.AVAX,
    logo: AvaxLogo
  }
};

export const chainIdByRouteNetwork: DynamicObject<EChainId, ERouteNetwork, AllKeysRequired> = {
  [ERouteNetwork.POLYGON]: EChainId.POLYGON_MAINNET,
  [ERouteNetwork.AVAX]: EChainId.AVAX_MAINNET,
};

export const tokenLabels: ValueByTokenAndNetwork = {
  [ESupportedTokens.USDC]: {},
  [ESupportedTokens.USDT]: {},
  [ESupportedTokens.DAI]: {},
  [ESupportedTokens.WETH]: {},
  [ESupportedTokens.WBTC]: {},
  [ESupportedTokens.WMATIC]: {},
  [ESupportedTokens.WAVAX]: {},
  [ESupportedTokens.CRVTRICRYPTO]: {
    [EChainId.POLYGON_MAINNET]: "ATRICRYPTO3",
    [EChainId.AVAX_MAINNET]: "ATRICRYPTO"
  }
};

// @TODO Abstract a bit more
export const buyTokenUrlByTokenAndNetwork: ValueByTokenAndNetwork = {
  [ESupportedTokens.USDC]: {
    [EChainId.POLYGON_MAINNET]: `https://quickswap.exchange/#/swap?outputCurrency=${addressByNetworkAndToken[ESupportedTokens.USDC][EChainId.POLYGON_MAINNET]}`
  },
  [ESupportedTokens.USDT]: {
    [EChainId.POLYGON_MAINNET]: `https://quickswap.exchange/#/swap?outputCurrency=${addressByNetworkAndToken[ESupportedTokens.USDT][EChainId.POLYGON_MAINNET]}`
  },
  [ESupportedTokens.DAI]: {
    [EChainId.POLYGON_MAINNET]: `https://quickswap.exchange/#/swap?outputCurrency=${addressByNetworkAndToken[ESupportedTokens.DAI][EChainId.POLYGON_MAINNET]}`
  },
  [ESupportedTokens.WETH]: {
    [EChainId.POLYGON_MAINNET]: `https://quickswap.exchange/#/swap?outputCurrency=${addressByNetworkAndToken[ESupportedTokens.WETH][EChainId.POLYGON_MAINNET]}`
  },
  [ESupportedTokens.WBTC]: {
    [EChainId.POLYGON_MAINNET]: `https://quickswap.exchange/#/swap?outputCurrency=${addressByNetworkAndToken[ESupportedTokens.WBTC][EChainId.POLYGON_MAINNET]}`
  },
  [ESupportedTokens.WMATIC]: {
    [EChainId.POLYGON_MAINNET]: `https://quickswap.exchange/#/swap?outputCurrency=${addressByNetworkAndToken[ESupportedTokens.WMATIC][EChainId.POLYGON_MAINNET]}`
  },
  [ESupportedTokens.WAVAX]: {},
  [ESupportedTokens.CRVTRICRYPTO]: {
    [EChainId.POLYGON_MAINNET]: "https://polygon.curve.fi/atricrypto3/deposit",
    [EChainId.AVAX_MAINNET]: "https://avax.curve.fi/atricrypto/deposit"
  }
};
