declare global {
  interface Window {
    // Any because different wallets can inject different versions
    web3?: any;
    ethereum?: any;
  }
}

export enum EConnectorType {
  INJECTED = "INJECTED",
  WALLET_CONNECT = "WALLET_CONNECT"
}

export enum EChainId {
  POLYGON_MAINNET = 137,
  POYLGON_MUMBAI = 80001
}
