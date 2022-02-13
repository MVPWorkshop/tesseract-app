export enum ESupportedTokens {
  WMATIC = "WMATIC",
  WAVAX = "WAVAX",
  USDC = "USDC",
  USDT = "USDT",
  DAI = "DAI",
  WETH = "WETH",
  WBTC = "WBTC",
  CRVTRICRYPTO = "CRVTRICRYPTO"
}

export enum EVaultState {
  OBSOLETE = "OBSOLETE",
  STABLE = "STABLE"
}

export interface IRegistryVault {
  address: string;
  state: EVaultState;
}
