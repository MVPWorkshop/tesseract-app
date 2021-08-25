import { AllKeysRequired, DynamicObject } from "../types/util.types";
import { EChainId } from "../types/web3.types";
import { POLYGON_MAINNET_RPC_URL } from "./config.constants";

export const RPC_URLS: DynamicObject<string, EChainId, AllKeysRequired> = {
  [EChainId.POLYGON_MAINNET]: POLYGON_MAINNET_RPC_URL,
  [EChainId.POYLGON_MUMBAI]: POLYGON_MAINNET_RPC_URL
};
