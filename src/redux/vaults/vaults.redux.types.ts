import { ReduxAction } from "../redux.types";
import { BigNumber } from "ethers";

export enum EVaultReduxActions {
  SET_VAULT_DETAILS = "SET_VAULT_DETAILS",
  SET_USER_VAULT_SHARES = "SET_USER_VAULT_BALANCE",
  SET_VAULT_TVL = "SET_VAULT_TVL",
  FETCH_VAULT_DETAILS = "FETCH_VAULT_DETAILS",
  FETCH_USER_VAULT_SHARES = "FETCH_USER_VAULT_SHARES",
  FETCH_VAULT_TVL = "FETCH_VAULT_TVL",
  DEPOSIT_ASSETS = "DEPOSIT_ASSETS",
  WITHDRAW_ASSETS = "WITHDRAW_ASSETS",
  WITHDRAW_ALL_ASSETS = "WITHDRAW_ALL_ASSETS",
  CLEAR_ALL_VAULTS_STATE = "CLEAR_ALL_VAULTS_STATE"
}

export type SetVaultDetailsAction = ReduxAction<EVaultReduxActions.SET_VAULT_DETAILS, {
  vault: string;
  symbol: string;
  apy: number;
  depositLimit: BigNumber;
  sharePrice: BigNumber;
}>

export type SetUserVaultSharesAction = ReduxAction<EVaultReduxActions.SET_USER_VAULT_SHARES, {
  vault: string;
  userShares: BigNumber;
}>

export type SetVaultTvlAction = ReduxAction<EVaultReduxActions.SET_VAULT_TVL, {
  vault: string;
  tvl: BigNumber;
}>

export type ClearAllVaultsStateAction = ReduxAction<EVaultReduxActions.CLEAR_ALL_VAULTS_STATE, any>

export type VaultsReduxActions =
  SetVaultDetailsAction |
  SetUserVaultSharesAction |
  SetVaultTvlAction |
  ClearAllVaultsStateAction;

export interface IVaultReduxState {
  symbol?: string;
  apy?: number;
  sharePrice?: BigNumber;
  userShares?: BigNumber;
  tvl?: BigNumber;
  depositLimit?: BigNumber;
}

export type IVaultsReduxReducerState = Record<string, IVaultReduxState>;
