import { AllKeysRequired, DynamicObject, SvgComponent } from "../types/util.types";
import { EChainId, EConnectorType } from "../types/web3.types";
import { EXPLORER_POLYGON_MAINNET, EXPLORER_POLYGON_MUMBAI, POLYGON_MAINNET_RPC_URL } from "./config.constants";
import { ReactComponent as MetamaskLogoSVG } from "../assets/metamask-logo.svg";
import { ReactComponent as WalletConnectLogoSVG } from "../assets/walletconnect-logo.svg";

export const RPC_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: POLYGON_MAINNET_RPC_URL,
  [EChainId.POYLGON_MUMBAI]: POLYGON_MAINNET_RPC_URL
};

export const EXPLORER_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: EXPLORER_POLYGON_MAINNET,
  [EChainId.POYLGON_MUMBAI]: EXPLORER_POLYGON_MUMBAI
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
  EChainId.POYLGON_MUMBAI
];
