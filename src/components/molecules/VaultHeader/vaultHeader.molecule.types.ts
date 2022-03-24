import {MouseEventHandler} from "react";
import { ESupportedTokens } from "../../../shared/types/vault.types";

export interface IVaultHeader {
  onClick: MouseEventHandler<HTMLDivElement>;
  token: ESupportedTokens;
}

