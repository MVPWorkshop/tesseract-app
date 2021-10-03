import { ESupportedTokens } from "../../shared/types/contract.types";
import { BigNumber } from "ethers";
import {
  ETokenReduxActions,
  SetTokenApprovedAmount,
  SetTokenBalanceAction,
  SetTokenDetailsAction,
  SetTokenVault
} from "./tokens.redux.types";
import { Thunk } from "../redux.types";
import { JsonRpcSigner } from "@ethersproject/providers";
import ActionUtil from "../../shared/utils/action.util";
import { EChainId } from "../../shared/types/web3.types";
import { addressByNetworkAndToken } from "../../shared/constants/web3.constants";
import Erc20ContractFactory from "../../shared/contracts/erc20Contract.factory";
import ApiService from "../../shared/services/api/api.service";
import RegistryContractFactory from "../../shared/contracts/registryContract.factory";

export function setTokenBalance(token: ESupportedTokens, newBalance: BigNumber): SetTokenBalanceAction {
  return {
    type: ETokenReduxActions.SET_TOKEN_BALANCE,
    payload: {
      balance: newBalance,
      token
    }
  };
}

export function setTokenDetails(token: ESupportedTokens, decimals: number, tokenPriceUSD: number): SetTokenDetailsAction {
  return {
    type: ETokenReduxActions.SET_TOKEN_DETAILS,
    payload: {
      token,
      decimals,
      tokenPriceUSD
    }
  };
}

export function setTokenVault(token: ESupportedTokens, vaultAddress: string): SetTokenVault {
  return {
    type: ETokenReduxActions.SET_TOKEN_VAULT,
    payload: {
      token,
      vaultAddress
    }
  };
}

export function setTokenApprovedAmount(token: ESupportedTokens, amount: BigNumber): SetTokenApprovedAmount {
  return {
    type: ETokenReduxActions.SET_TOKEN_APPROVED_AMOUNT,
    payload: {
      token,
      amount
    }
  };
}

export function fetchTokenBalance(token: ESupportedTokens, userAddress: string, provider: JsonRpcSigner): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.FETCH_TOKEN_BALANCE, token));

      const tokenContract = await (new Erc20ContractFactory(token, provider)).getInstance();
      const balance = await tokenContract.balanceOf(userAddress);

      dispatch(setTokenBalance(token, balance));
      dispatch(ActionUtil.successAction(ETokenReduxActions.FETCH_TOKEN_BALANCE, token));
    } catch {
      dispatch(ActionUtil.errorAction(ETokenReduxActions.FETCH_TOKEN_BALANCE, token));
    }
  };
}

export function fetchTokenDetails(token: ESupportedTokens, provider: JsonRpcSigner): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.FETCH_TOKEN_DETAILS, token));

      const tokenContract = await (new Erc20ContractFactory(token, provider)).getInstance();
      const apiService = new ApiService();

      const tokenDecimals = await tokenContract.decimals();
      const tokenSymbol = await tokenContract.symbol();
      const tokenPriceUSD = await apiService.getTokenPrice(tokenSymbol);

      dispatch(setTokenDetails(token, tokenDecimals, parseInt(tokenPriceUSD)));
      dispatch(ActionUtil.successAction(ETokenReduxActions.FETCH_TOKEN_DETAILS, token));
    } catch {
      dispatch(ActionUtil.errorAction(ETokenReduxActions.FETCH_TOKEN_DETAILS, token));
    }
  };
}

export function fetchTokenVault(token: ESupportedTokens, provider: JsonRpcSigner): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.FETCH_TOKEN_VAULT, token));

      const chainId: EChainId = await provider.getChainId();
      const registryContract = await (new RegistryContractFactory(provider)).getInstance(chainId);
      const tokenAddress = addressByNetworkAndToken[token][chainId];
      if (!tokenAddress) {
        throw new Error("Token not supported on current network");
      }
      const vaultAddress = await registryContract.latestVault(tokenAddress);

      dispatch(setTokenVault(token, vaultAddress));
      dispatch(ActionUtil.successAction(ETokenReduxActions.FETCH_TOKEN_VAULT, token));
    } catch {
      dispatch(ActionUtil.errorAction(ETokenReduxActions.FETCH_TOKEN_VAULT, token));
    }
  };
}

export function fetchTokenApprovedAmount(token: ESupportedTokens, userAddress: string, vaultAddress: string, provider: JsonRpcSigner): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token));

      const tokenContract = await (new Erc20ContractFactory(token, provider)).getInstance();
      const allowed = await tokenContract.allowance(userAddress, vaultAddress);

      dispatch(setTokenApprovedAmount(token, allowed));
      dispatch(ActionUtil.successAction(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token));
    } catch {
      dispatch(ActionUtil.errorAction(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token));
    }
  };
}
