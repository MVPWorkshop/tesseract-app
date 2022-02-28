export enum ESupportedTokens {
  CRVTRICRYPTO = "CRVTRICRYPTO",
  WMATIC = "WMATIC",
  WAVAX = "WAVAX",
  USDC = "USDC",
  USDT = "USDT",
  DAI = "DAI",
  WETH = "WETH",
  WBTC = "WBTC",
}

export enum EVaultState {
  OBSOLETE = "OBSOLETE",
  STABLE = "STABLE"
}

export interface IRegistryVault {
  address: string;
  state: EVaultState;
}
