import {SvgComponent} from "../../../shared/types/util.types";
import { EAssetType } from "../../../shared/constants/common.constants";

export interface ITokenDetail {
  assetType: EAssetType
  logo: SvgComponent
  name: string
  purchaseLink?: string
}
