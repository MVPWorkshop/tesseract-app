export enum ESupportedTokens {
  USDC = "USDC",
  USDT = "USDT",
  DAI = "DAI",
  WETH = "WETH",
  WBTC = "WBTC",
  WMATIC = "WMATIC"
}

export enum EVaultState {
  OBSOLETE = "OBSOLETE",
  STABLE = "STABLE"
}

export interface IRegistryVault {
  address: string;
  state: EVaultState;
}
