import { AllKeysRequired, DynamicObject, SvgComponent } from "../types/util.types";
import { EChainId, EConnectorType } from "../types/web3.types";
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

import { TokenAddressByNetwork } from "../types/contract.types";
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
  EChainId.POLYGON_MAINNET,
  EChainId.AVAX_MAINNET
];

export const addressByNetworkAndToken: TokenAddressByNetwork = {
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
  }
};

interface IUtilChainData {
  tokenTicker: string;
  label: string;
  multicallAddress: string;
  routeParam: ERouteNetwork;
  logo: SvgComponent;
}

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
