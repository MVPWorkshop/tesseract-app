import { ReduxAction } from "../redux.types";
import { ESupportedTokens } from "../../shared/types/contract.types";
import { BigNumber } from "ethers";

export enum ETokenReduxActions {
  SET_TOKEN_BALANCE = "SET_TOKEN_BALANCE",
  SET_TOKEN_DETAILS = "SET_TOKEN_DETAILS",
  SET_TOKEN_VAULT = "SET_TOKEN_VAULT",
  SET_TOKEN_APPROVED_AMOUNT = "SET_TOKEN_APPROVED_AMOUNT",
  FETCH_TOKEN_BALANCE = "FETCH_TOKEN_BALANCE",
  FETCH_TOKEN_DETAILS = "FETCH_TOKEN_DETAILS",
  FETCH_TOKEN_VAULT = "FETCH_TOKEN_VAULT",
  FETCH_TOKEN_APPROVED_AMOUNT = "FETCH_TOKEN_APPROVED_AMOUNT",
  APPROVE_TOKEN_SPENDING = "APPROVE_TOKEN_SPENDING"
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

export type SetTokenVault = ReduxAction<ETokenReduxActions.SET_TOKEN_VAULT, {
  token: ESupportedTokens;
  vaultAddress: string;
}>

export type SetTokenApprovedAmount = ReduxAction<ETokenReduxActions.SET_TOKEN_APPROVED_AMOUNT, {
  token: ESupportedTokens;
  amount: BigNumber;
}>

export type TokenReduxActions =
  SetTokenBalanceAction |
  SetTokenDetailsAction |
  SetTokenVault |
  SetTokenApprovedAmount

export interface ITokenReduxState {
  vaultAddress?: string;
  balance?: BigNumber;
  amountApproved?: BigNumber;
  priceUSD?: number;
  decimals?: number;
}

export type ITokensReduxReducerState = Record<ESupportedTokens, ITokenReduxState>;
