import { BigNumber } from "ethers";
import {
  AddTokenVault,
  ClearAllTokensStateAction,
  ETokenReduxActions,
  SetTokenApprovedAmount,
  SetTokenBalanceAction,
  SetTokenDetailsAction
} from "./tokens.redux.types";
import { Thunk } from "../redux.types";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import ActionUtil from "../../shared/utils/action.util";
import { EChainId } from "../../shared/types/web3.types";
import Erc20ContractFactory from "../../shared/contracts/erc20Contract.factory";
import ApiService from "../../shared/services/api/api.service";
import { CONFIRMATIONS_SUCCESS } from "../../shared/constants/config.constants";
import { toast } from "react-toastify";
import { i18n } from "@lingui/core";
import React from "react";
import Link from "../../components/atoms/Link/link.atom";
import Web3Util from "../../shared/utils/web3.util";
import { t } from "@lingui/macro";
import { ESupportedTokens, IRegistryVault } from "../../shared/types/vault.types";

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

export function addTokenVault(token: ESupportedTokens, vault: IRegistryVault): AddTokenVault {
  return {
    type: ETokenReduxActions.ADD_TOKEN_VAULT,
    payload: {
      token,
      vault
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

export function clearAllTokensState(): ClearAllTokensStateAction {
  return {
    type: ETokenReduxActions.CLEAR_ALL_TOKENS_STATE,
    payload: {}
  };
}

export function fetchTokenBalance(token: ESupportedTokens, userAddress: string, provider: JsonRpcProvider, chainId: EChainId): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.FETCH_TOKEN_BALANCE, token));

      const tokenContract = await (new Erc20ContractFactory(token, provider)).getInstance(chainId);
      const balance = await tokenContract.balanceOf(userAddress);

      dispatch(setTokenBalance(token, balance));
      dispatch(ActionUtil.successAction(ETokenReduxActions.FETCH_TOKEN_BALANCE, token));
    } catch {
      dispatch(ActionUtil.errorAction(ETokenReduxActions.FETCH_TOKEN_BALANCE, token));
    }
  };
}

export function fetchTokenDetails(token: ESupportedTokens, provider: JsonRpcProvider, chainId: EChainId): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.FETCH_TOKEN_DETAILS, token));

      const tokenContract = await (new Erc20ContractFactory(token, provider)).getInstance(chainId);
      const apiService = new ApiService();

      const tokenDecimals = await tokenContract.decimals();
      const tokenSymbol = await tokenContract.symbol();
      const tokenPriceUSD = await apiService.getTokenPrice(tokenSymbol, chainId);

      dispatch(setTokenDetails(token, tokenDecimals, parseFloat(tokenPriceUSD)));
      dispatch(ActionUtil.successAction(ETokenReduxActions.FETCH_TOKEN_DETAILS, token));
    } catch {
      dispatch(ActionUtil.errorAction(ETokenReduxActions.FETCH_TOKEN_DETAILS, token));
    }
  };
}

export function fetchTokenApprovedAmount(token: ESupportedTokens, userAddress: string, vaultAddress: string, provider: JsonRpcProvider, chainId: EChainId): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token));

      const tokenContract = await (new Erc20ContractFactory(token, provider)).getInstance(chainId);
      const allowed = await tokenContract.allowance(userAddress, vaultAddress);

      dispatch(setTokenApprovedAmount(token, allowed));
      dispatch(ActionUtil.successAction(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token));
    } catch {
      dispatch(ActionUtil.errorAction(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token));
    }
  };
}

export function approveTokenSpending(token: ESupportedTokens, amount: BigNumber, userAddress: string, spender: string, signer: JsonRpcSigner, chainId: EChainId): Thunk<void> {
  let toastId: React.ReactText;

  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(ETokenReduxActions.APPROVE_TOKEN_SPENDING, token));

      const tokenContract = await (new Erc20ContractFactory(token, signer)).getInstance(chainId);
      const tx = await tokenContract.approve(spender, amount);
      toastId = toast.loading(i18n._(t`Waiting for confirmations`));
      const receipt = await tx.wait(CONFIRMATIONS_SUCCESS);
      const txHash = receipt.transactionHash;
      const txLink = Web3Util.getExplorerLink(chainId, txHash, "tx");

      toast.update(toastId, {
        type: "success",
        render: Link({ newTab: true, link: txLink!, children: i18n._(t`Transactions hash: ${txHash}`)}),
        isLoading: false,
        autoClose: 3500
      });
      dispatch(setTokenApprovedAmount(token, amount));
      dispatch(fetchTokenApprovedAmount(token, userAddress, spender, signer.provider, chainId));
      dispatch(ActionUtil.successAction(ETokenReduxActions.APPROVE_TOKEN_SPENDING, token));
    } catch (error) {
      if (toastId) {
        toast.update(toastId, {
          type: "error",
          render: i18n._(t`Failed approving token for spending`),
          isLoading: false,
          autoClose: 2000
        });
      }
      dispatch(ActionUtil.errorAction(ETokenReduxActions.APPROVE_TOKEN_SPENDING, token));
    }
  };
}
