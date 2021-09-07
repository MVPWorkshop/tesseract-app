const {
  REACT_APP_API_BASE_URL,
  REACT_APP_PROVIDER_POLLING_INTERVAL,
  REACT_APP_POLYGON_MAINNET_RPC_URL,
  REACT_APP_POLYGON_MUMBAI_RPC_URL,
  REACT_APP_SUPPORTED_CHAIN_IDS,
  REACT_APP_METAMASK_DOWNLOAD_LINK,
  REACT_APP_EXPLORER_POLYGON_MAINNET,
  REACT_APP_EXPLORER_POLYGON_MUMBAI
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

if (!REACT_APP_POLYGON_MAINNET_RPC_URL || !REACT_APP_POLYGON_MUMBAI_RPC_URL) {
  throw new Error("Must provide RPC urls");
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

if (!REACT_APP_EXPLORER_POLYGON_MAINNET || !REACT_APP_EXPLORER_POLYGON_MUMBAI) {
  throw new Error("Please provide block explorer site addresses");
}

export const API_BASE_URL = REACT_APP_API_BASE_URL;
export const PROVIDER_POLLING_INTERVAL = parseInt(REACT_APP_PROVIDER_POLLING_INTERVAL);
export const POLYGON_MAINNET_RPC_URL = REACT_APP_POLYGON_MAINNET_RPC_URL;
export const POLYGON_MUMBAI_RPC_URL = REACT_APP_POLYGON_MUMBAI_RPC_URL;
export const SUPPORTED_CHAIN_IDS = JSON.parse(REACT_APP_SUPPORTED_CHAIN_IDS) as number[];
export const METAMASK_DOWNLOAD_LINK = REACT_APP_METAMASK_DOWNLOAD_LINK;
export const EXPLORER_POLYGON_MAINNET = REACT_APP_EXPLORER_POLYGON_MAINNET;
export const EXPLORER_POLYGON_MUMBAI = REACT_APP_EXPLORER_POLYGON_MUMBAI;
