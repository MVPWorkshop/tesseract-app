import {SvgComponent} from "../../../shared/types/util.types";

export enum EAssetType {
  LP = "Add liquidity",
  Token = "Buy token",
}

export interface ITokenDetail {
  assetType: EAssetType
  logo: SvgComponent
  name: string
  purchaseLink?: string
}
