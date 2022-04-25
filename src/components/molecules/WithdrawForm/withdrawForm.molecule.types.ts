import { JsonRpcSigner } from "@ethersproject/providers";
import { Nullable } from "../../../shared/types/util.types";
import { ESupportedTokens } from "../../../shared/types/vault.types";
import { EChainId } from "../../../shared/types/web3.types";

export interface IWithdrawFormProps {
  token: ESupportedTokens;
  account: Nullable<string>;
  chainId: EChainId;
  signer: Nullable<JsonRpcSigner>;
  vaultAddress: string;
}
