import {Nullable, SvgComponent} from "../../../shared/types/util.types";

export interface ITokenDetail {
  assetTypeLabel: string
  logo: SvgComponent
  name: string
  purchaseLink?: Nullable<string> 
}
