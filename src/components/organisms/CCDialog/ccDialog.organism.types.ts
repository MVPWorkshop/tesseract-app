import { EChainId } from "../../../shared/types/web3.types";
import { IClassableComponent } from "../../../shared/types/util.types";

export interface IChainConstrainDialogProps extends IClassableComponent {
  isSignerAvailable: boolean;
  wantedNetwork: EChainId;
}
