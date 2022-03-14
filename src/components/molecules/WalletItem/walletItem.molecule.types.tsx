import {EConnectorType} from "../../../shared/types/web3.types";

interface ConnectFunction {
  (): void
}

export interface IWalletItem {
  connectorType: EConnectorType
  onClick: ConnectFunction 
}
