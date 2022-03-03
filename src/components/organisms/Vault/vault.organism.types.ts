import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { EChainId } from "../../../shared/types/web3.types";
import { Nullable, OnChange } from "../../../shared/types/util.types";
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

export interface ISetBalanceOptions {
  value: Nullable<string>;
  handler: OnChange<string>;
}
