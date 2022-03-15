import {ERouteNetwork} from "../../router/router.types";
import {SvgComponent} from "./util.types";

export interface IUtilChainData {
  tokenTicker: string;
  label: string;
  multicallAddress: string;
  routeParam: ERouteNetwork;
  logo: SvgComponent;
}

export interface IConnectorMetadata {
  label: string;
  description: string;
  logo: SvgComponent; 
}
