import { ESupportedTokens } from "../../../shared/types/contract.types";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { EChainId } from "../../../shared/types/web3.types";
import { Nullable } from "../../../shared/types/util.types";

export interface IVaultProps {
  token: ESupportedTokens;
  signer: JsonRpcSigner;
  chainId: EChainId;
  account: Nullable<string>;
  provider: JsonRpcProvider;
}
