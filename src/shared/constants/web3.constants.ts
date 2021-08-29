import { AllKeysRequired, DynamicObject } from "../types/util.types";
import { EChainId, EConnectorType } from "../types/web3.types";
import { POLYGON_MAINNET_RPC_URL } from "./config.constants";

export const RPC_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: POLYGON_MAINNET_RPC_URL,
  [EChainId.POYLGON_MUMBAI]: POLYGON_MAINNET_RPC_URL
};

export const CONNECTOR_LABELS: DynamicObject<string, EConnectorType, AllKeysRequired> = {
  [EConnectorType.INJECTED]: "Metamask",
  [EConnectorType.WALLET_CONNECT]: "Wallet Connect"
};

export const supportedConnectorList: EConnectorType[] = [
  EConnectorType.INJECTED,
  EConnectorType.WALLET_CONNECT
];

export const supportedChainIds: EChainId[] = [
  EChainId.POLYGON_MAINNET,
  EChainId.POYLGON_MUMBAI
];
