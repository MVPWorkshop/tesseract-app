import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { EChainId } from "../../../shared/types/web3.types";
import { Nullable } from "../../../shared/types/util.types";
import { ESupportedTokens } from "../../../shared/types/vault.types";

export interface IVaultProps {
  token: ESupportedTokens;
  flag?: "obsolete" | "new";
  vaultAddress: string;
  signer: Nullable<JsonRpcSigner>;
  chainId: EChainId;
  account: Nullable<string>;
  provider: JsonRpcProvider;
}

export interface IOnChangeHandler {
  (value: string): void
}

export interface ISetBalanceOptions {
  value?: string;
  handler: IOnChangeHandler;
}
