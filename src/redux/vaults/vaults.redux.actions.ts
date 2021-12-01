import {
  EVaultReduxActions,
  SetUserVaultSharesAction,
  SetVaultDetailsAction,
  SetVaultTvlAction
} from "./vaults.redux.types";
import { BigNumber, ContractTransaction } from "ethers";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { Thunk } from "../redux.types";
import ActionUtil from "../../shared/utils/action.util";
import ContractFactory from "../../shared/contracts/contract.factory";
import { EContractType} from "../../shared/types/contract.types";
import ApiService from "../../shared/services/api/api.service";
import { CONFIRMATIONS_SUCCESS } from "../../shared/constants/config.constants";
import { fetchTokenBalance } from "../tokens/tokens.redux.actions";
import { EChainId } from "../../shared/types/web3.types";
import React from "react";
import { toast } from "react-toastify";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import Link from "../../components/atoms/Link/link.atom";
import Web3Util from "../../shared/utils/web3.util";
import { ESupportedTokens } from "../../shared/types/vault.types";

export function setVaultDetails(vault: string, symbol: string, apy: number, depositLimit: BigNumber): SetVaultDetailsAction {
  return {
    type: EVaultReduxActions.SET_VAULT_DETAILS,
    payload: {
      vault,
      symbol,
      apy,
      depositLimit
    }
  };
}

export function setUserVaultShares(vault: string, userShares: BigNumber, sharePrice: BigNumber): SetUserVaultSharesAction {
  return {
    type: EVaultReduxActions.SET_USER_VAULT_SHARES,
    payload: {
      vault,
      sharePrice,
      userShares
    }
  };
}

export function setVaultTvl(vault: string, tvl: BigNumber): SetVaultTvlAction {
  return {
    type: EVaultReduxActions.SET_VAULT_TVL,
    payload: {
      vault,
      tvl
    }
  };
}

export function fetchVaultDetails(vaultAddress: string, provider: JsonRpcProvider): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, provider);
      const apiService = new ApiService();

      const symbol = await vaultContract.symbol();
      const apiVersion = await vaultContract.apiVersion();

      const apy = await apiService.getVaultAPY(symbol, apiVersion);
      const depositLimit = await vaultContract.availableDepositLimit();

      dispatch(setVaultDetails(vaultAddress, symbol, parseFloat(apy), depositLimit));
      dispatch(ActionUtil.successAction(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress));
    } catch {
      dispatch(ActionUtil.errorAction(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress));
    }
  };
}

export function fetchUserVaultShares(vaultAddress: string, userAddress: string, provider: JsonRpcProvider): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, provider);
      const userVaultShares = await vaultContract.balanceOf(userAddress);
      const sharePrice = await vaultContract.pricePerShare();

      dispatch(setUserVaultShares(vaultAddress, userVaultShares, sharePrice));
      dispatch(ActionUtil.successAction(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress));
    } catch {
      dispatch(ActionUtil.errorAction(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress));
    }
  };
}

export function fetchVaultTvl(vaultAddress: string, provider: JsonRpcProvider): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, provider);
      const totalAssetsDeposited = await vaultContract.functions.totalAssets();

      dispatch(setVaultTvl(vaultAddress, totalAssetsDeposited[0]));
      dispatch(ActionUtil.successAction(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress));
    } catch (error) {
      dispatch(ActionUtil.errorAction(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress));
    }
  };
}

export function depositAssetsIntoVault(token: ESupportedTokens, vaultAddress: string, userAddress: string, amount: BigNumber, signer: JsonRpcSigner, chainId: EChainId): Thunk<void> {
  let toastId: React.ReactText;

  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, signer);
      const tx = await vaultContract["deposit(uint256)"](amount);
      toastId = toast.loading(i18n._(t`Waiting for confirmations`));
      const receipt = await tx.wait(CONFIRMATIONS_SUCCESS);
      const txHash = receipt.transactionHash;
      const txLink = Web3Util.getExplorerLink(chainId, txHash, "tx");

      dispatch(fetchUserVaultShares(vaultAddress, userAddress, signer.provider));
      dispatch(fetchTokenBalance(token, userAddress, signer.provider, chainId));

      toast.update(toastId, {
        type: "success",
        render: Link({ newTab: true, link: txLink!, children: i18n._(t`Transactions hash: ${txHash}`)}),
        isLoading: false,
        autoClose: 3500
      });

      dispatch(ActionUtil.successAction(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress));
    } catch {
      if (toastId) {
        toast.update(toastId, {
          type: "error",
          render: i18n._(t`Failed depositing to the vault`),
          isLoading: false,
          autoClose: 2000
        });
      }
      dispatch(ActionUtil.errorAction(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress));
    }
  };
}

export function withdrawAssetsFromVault(token: ESupportedTokens, vaultAddress: string, userAddress: string, amount: BigNumber | -1, signer: JsonRpcSigner, chainId: EChainId): Thunk<void> {
  let toastId: React.ReactText;
  const actionName = amount === -1 ? EVaultReduxActions.WITHDRAW_ALL_ASSETS : EVaultReduxActions.WITHDRAW_ASSETS;

  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(actionName, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, signer);
      let tx: ContractTransaction;
      if (amount === -1) {
        tx = await vaultContract["withdraw()"]();
      } else {
        tx = await vaultContract["withdraw(uint256)"](amount);
      }
      toastId = toast.loading(i18n._(t`Waiting for confirmations`));
      const receipt = await tx.wait(CONFIRMATIONS_SUCCESS);
      const txHash = receipt.transactionHash;
      const txLink = Web3Util.getExplorerLink(chainId, txHash, "tx");

      dispatch(fetchUserVaultShares(vaultAddress, userAddress, signer.provider));
      dispatch(fetchTokenBalance(token, userAddress, signer.provider, chainId));

      toast.update(toastId, {
        type: "success",
        render: Link({ newTab: true, link: txLink!, children: i18n._(t`Transactions hash: ${txHash}`)}),
        isLoading: false,
        autoClose: 3500
      });

      dispatch(ActionUtil.successAction(actionName, vaultAddress));
    } catch {
      if (toastId) {
        toast.update(toastId, {
          type: "error",
          render: i18n._(t`Failed withdrawing from the vault`),
          isLoading: false,
          autoClose: 2000
        });
      }
      dispatch(ActionUtil.errorAction(actionName, vaultAddress));
    }
  };
}
