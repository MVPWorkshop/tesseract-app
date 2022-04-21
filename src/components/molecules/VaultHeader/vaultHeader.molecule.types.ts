import { MouseEventHandler } from "react";
import { IVaultReduxState } from "../../../redux/vaults/vaults.redux.types";
import { Nullable } from "../../../shared/types/util.types";
import { ESupportedTokens } from "../../../shared/types/vault.types";
import { EChainId } from "../../../shared/types/web3.types";

export interface IVaultHeader {
  onClick: MouseEventHandler<HTMLDivElement>;
  token: ESupportedTokens;
  chainId: EChainId;
  loading: boolean;
  vaultData?: Nullable<IVaultReduxState>;
}

