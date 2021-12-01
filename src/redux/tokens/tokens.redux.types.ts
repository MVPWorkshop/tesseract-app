import { ReduxAction } from "../redux.types";
import { BigNumber } from "ethers";
import { ESupportedTokens, EVaultState, IRegistryVault } from "../../shared/types/vault.types";

export enum ETokenReduxActions {
  SET_TOKEN_BALANCE = "SET_TOKEN_BALANCE",
  SET_TOKEN_DETAILS = "SET_TOKEN_DETAILS",
  SET_TOKEN_VAULTS = "SET_TOKEN_VAULTS",
  SET_TOKEN_APPROVED_AMOUNT = "SET_TOKEN_APPROVED_AMOUNT",
  FETCH_TOKEN_BALANCE = "FETCH_TOKEN_BALANCE",
  FETCH_TOKEN_DETAILS = "FETCH_TOKEN_DETAILS",
  FETCH_TOKEN_VAULTS = "FETCH_TOKEN_VAULTS",
  FETCH_TOKEN_APPROVED_AMOUNT = "FETCH_TOKEN_APPROVED_AMOUNT",
  APPROVE_TOKEN_SPENDING = "APPROVE_TOKEN_SPENDING",
  FETCH_ALL_AVAILABLE_VAULTS = "FETCH_ALL_AVAILABLE_VAULTS"
}

export type SetTokenBalanceAction = ReduxAction<ETokenReduxActions.SET_TOKEN_BALANCE, {
  token: ESupportedTokens;
  balance: BigNumber;
}>

export type SetTokenDetailsAction = ReduxAction<ETokenReduxActions.SET_TOKEN_DETAILS, {
  token: ESupportedTokens;
  decimals: number;
  tokenPriceUSD: number;
}>

export type SetTokenVaults = ReduxAction<ETokenReduxActions.SET_TOKEN_VAULTS, {
  token: ESupportedTokens;
  vaults: IRegistryVault[];
}>

export type SetTokenApprovedAmount = ReduxAction<ETokenReduxActions.SET_TOKEN_APPROVED_AMOUNT, {
  token: ESupportedTokens;
  amount: BigNumber;
}>

export type TokenReduxActions =
  SetTokenBalanceAction |
  SetTokenDetailsAction |
  SetTokenVaults |
  SetTokenApprovedAmount

export interface ITokenReduxState {
  vaults?: {
    address: string;
    state: EVaultState;
  }[];
  balance?: BigNumber;
  amountApproved?: BigNumber;
  priceUSD?: number;
  decimals?: number;
}

export type ITokensReduxReducerState = Record<ESupportedTokens, ITokenReduxState>;
