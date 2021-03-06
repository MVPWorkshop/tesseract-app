import { EChainId } from "../types/web3.types";

const {
  REACT_APP_API_BASE_URL,
  REACT_APP_PROVIDER_POLLING_INTERVAL,
  REACT_APP_SUPPORTED_CHAIN_IDS,
  REACT_APP_DEFAULT_CHAIN_ID,
  REACT_APP_METAMASK_DOWNLOAD_LINK,
  REACT_APP_EXPLORER_POLYGON_MAINNET,
  REACT_APP_EXPLORER_AVAX_MAINNET,
  REACT_APP_REGISTRY_ADDRESS_POLYGON_MAINNET,
  REACT_APP_REGISTRY_ADDRESS_AVAX_MAINNET,
  REACT_APP_CONFIRMATIONS_SUCCESS,
  REACT_APP_RPC_PROVIDER_POLYGON,
  REACT_APP_RPC_PROVIDER_AVAX,
  REACT_APP_BANNER_ENABLED,
  REACT_APP_BANNER_TEXT
} = process.env;

if (!REACT_APP_API_BASE_URL) {
  throw new Error("Must provide API base url");
}

if(!REACT_APP_PROVIDER_POLLING_INTERVAL) {
  throw new Error("Must provide web3 provider polling interval");
} else {
  if (!Number.isInteger(parseInt(REACT_APP_PROVIDER_POLLING_INTERVAL))) {
    throw new Error("Polling interval must be a number");
  }
}

if (!REACT_APP_SUPPORTED_CHAIN_IDS) {
  throw new Error("Must provide supported chains");
} else {
  const parsed = JSON.parse(REACT_APP_SUPPORTED_CHAIN_IDS);

  if (!Array.isArray(parsed)) {
    throw new Error("SUPPORTED_CHAIN_IDS must be array");
  } else {
    parsed.forEach(id => {
      if (!Number.isInteger(id)) {
        throw new Error("IDs must be integers");
      }
    });
  }
}

if (!REACT_APP_METAMASK_DOWNLOAD_LINK) {
  throw new Error("Please provide Metamask download link");
}

if (!REACT_APP_EXPLORER_POLYGON_MAINNET || !REACT_APP_EXPLORER_AVAX_MAINNET) {
  throw new Error("Please provide block explorer site addresses");
}

if (!REACT_APP_REGISTRY_ADDRESS_POLYGON_MAINNET || !REACT_APP_REGISTRY_ADDRESS_AVAX_MAINNET) {
  throw new Error("Please provide the registry address");
}

if (!REACT_APP_CONFIRMATIONS_SUCCESS) {
  throw new Error("Please provide number of confirmations needed to consider tx successful");
}

if (!REACT_APP_DEFAULT_CHAIN_ID) {
  throw new Error("Please provide default chain id");
} else {
  if (!Number.isInteger(JSON.parse(REACT_APP_DEFAULT_CHAIN_ID))) {
    throw new Error("Default chain id must be integer");
  }
}

if (!REACT_APP_RPC_PROVIDER_POLYGON || !REACT_APP_RPC_PROVIDER_AVAX) {
  throw new Error("Please provide RPC urls");
}

if (REACT_APP_BANNER_ENABLED && !REACT_APP_BANNER_TEXT) {
  throw new Error("Please provide text for the app banner");
}

export const API_BASE_URL = REACT_APP_API_BASE_URL;
export const PROVIDER_POLLING_INTERVAL = parseInt(REACT_APP_PROVIDER_POLLING_INTERVAL);
export const SUPPORTED_CHAIN_IDS = JSON.parse(REACT_APP_SUPPORTED_CHAIN_IDS) as number[];
export const METAMASK_DOWNLOAD_LINK = REACT_APP_METAMASK_DOWNLOAD_LINK;
export const CONFIRMATIONS_SUCCESS = parseInt(REACT_APP_CONFIRMATIONS_SUCCESS);
export const DEFAULT_CHAIN_ID = parseInt(REACT_APP_DEFAULT_CHAIN_ID) as EChainId;
export const BANNER_ENABLED = REACT_APP_BANNER_ENABLED === "true";
export const BANNER_TEXT = REACT_APP_BANNER_TEXT as string;

export const EXPLORER_POLYGON_MAINNET = REACT_APP_EXPLORER_POLYGON_MAINNET;
export const EXPLORER_AVAX_MAINNET = REACT_APP_EXPLORER_AVAX_MAINNET;

export const REGISTRY_ADDRESS_POLYGON_MAINNET = REACT_APP_REGISTRY_ADDRESS_POLYGON_MAINNET;
export const REGISTRY_ADDRESS_AVAX_MAINNET = REACT_APP_REGISTRY_ADDRESS_AVAX_MAINNET;

export const RPC_PROVIDER_POLYGON = REACT_APP_RPC_PROVIDER_POLYGON;
export const RPC_PROVIDER_AVAX = REACT_APP_RPC_PROVIDER_AVAX;
