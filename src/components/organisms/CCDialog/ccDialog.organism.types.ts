import { EChainId } from "../../../shared/types/web3.types";

export interface IChainConstrainDialogProps {
  isSignerAvailable: boolean;
  wantedNetwork: EChainId;
}
