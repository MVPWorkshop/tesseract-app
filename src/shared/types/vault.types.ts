import { JsonRpcSigner } from "@ethersproject/providers";
import { Nullable } from "./util.types";
import { EChainId } from "./web3.types";

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

export interface IVaultForm {
  token: ESupportedTokens;
  account: Nullable<string>;
  chainId: EChainId;
  signer: Nullable<JsonRpcSigner>;
  vaultAddress: string;

}
