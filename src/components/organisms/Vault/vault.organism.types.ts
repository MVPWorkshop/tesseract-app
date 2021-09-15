import { ESupportedTokens } from "../../../shared/types/contract.types";
import { EChainId } from "../../../shared/types/web3.types";

export interface IVaultProps {
  token: ESupportedTokens;
  chain: EChainId;
}
