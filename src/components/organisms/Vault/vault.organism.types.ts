import { ESupportedTokens } from "../../../shared/types/contract.types";
import { JsonRpcSigner } from "@ethersproject/providers";

export interface IVaultProps {
  token: ESupportedTokens;
  signer: JsonRpcSigner;
}
