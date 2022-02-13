export enum ERoutes {
  LANDING = "/",
  VAULTS = "/vaults",
  NOT_FOUND = "/not-found"
}

export enum ERouteNetwork {
  POLYGON = "polygon",
  AVAX = "avalanche"
}

export interface IVaultPageParams {
  network?: ERouteNetwork;
}
