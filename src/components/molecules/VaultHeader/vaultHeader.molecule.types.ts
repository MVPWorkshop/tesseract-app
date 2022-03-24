import {MouseEventHandler} from "react";
import { ESupportedTokens } from "../../../shared/types/vault.types";
import {EChainId} from "../../../shared/types/web3.types";

export interface IVaultHeader {
  onClick: MouseEventHandler<HTMLDivElement>;
  token: ESupportedTokens;
  chainId: EChainId;
}

