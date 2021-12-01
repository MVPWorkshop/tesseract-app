import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { EChainId } from "../../../shared/types/web3.types";
import { Nullable } from "../../../shared/types/util.types";
import { ESupportedTokens } from "../../../shared/types/vault.types";

export interface IVaultProps {
  token: ESupportedTokens;
  vaultAddress: string;
  signer: JsonRpcSigner;
  chainId: EChainId;
  account: Nullable<string>;
  provider: JsonRpcProvider;
}
