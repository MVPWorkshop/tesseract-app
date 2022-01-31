import { EChainId } from "../../../shared/types/web3.types";
import { IClassableComponent } from "../../../shared/types/util.types";

export interface INetworkPickerProps extends IClassableComponent {
  chainIds: EChainId[];
  activeChainId: EChainId;
}
